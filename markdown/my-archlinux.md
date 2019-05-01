---
title: '我的 Arch Linux'
date: "2018-11-25T09:35:20.000Z"
path: '/my-archlinux'
---

哈哈，怎么说 Arch Linux 这个发行版，用了有一点时间，感觉还好吧，要享受其高可定制性，同时也要经得起折腾，虽然基本上全部的包都可以从仓库中 `pacman` 下来，但总有些个人觉得要修改的地方，所以尽情折腾吧。

言归正传，这里主要介绍一下 Arch Linux 的安装以及一些日常使用的设置啥儿的，是之前看官方安装文档以及之后多次安装的经历精简总结下来的。主要有以下的这些步骤：

## 1、准备新分区

我的笔记本支持 `UEFI`，所以我使用的是 `UEFI + GPT` 分区方案。

```bash
# 建立分区
# 256M ESP 分区 /boot/efi
# 50G+ 根分区 /
# 其他分区，/home、swap 等
gdisk /dev/sda

# 格式化并挂挂载分区
mkfs.fat -F 32 /dev/sda1
mkfs.ext4 -L LABEL /dev/sda2
mount /dev/sda2 /mnt
mkdir -p /mnt/boot/efi
mount /dev/sda1 /mnt/boot/efi
```

> 其中，`LABEL` 是可以自定义的标卷名称，如果不需要自定义标卷名的话，省略掉 `-L LABEL` 就好。

至此，新分区准备工作完成。

如果对于分区命令 `gdisk` 不熟悉，可以先行搜索相关资料。

## 2、选择镜像源

编辑镜像源文件，并将国内的镜像源移到最前,一般中科大源和 163 源就可以了，其他的删除掉就好，如下：

```bash
vim /etc/pacman.d/mirrorlist
----------------------------

Server = http://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = http://mirrors.163.com/archlinux/$repo/os/$arch
```

## 3、安装系统

```bash
pacstrap -i /mnt base base-devel \
vim dialog grub dosfstools efibootmgr os-prober \
xf86-video-vesa xf86-video-intel xf86-video-nouveau \
xf86-input-synaptics plasma konsole dolphin bumblebee \
bbswitch networkmanager fcitx fcitx-im fcitx-configtool
```

> _这里其实先只安装 `base`，其他的包在 `chroot` 的时候安装都是可以，只是个人喜欢一次就全部安装好而已_
>
> `base` 是 `Arch Linux` 基础软件包，必装
>
> `base-devel` 包含 `gcc` 等编译工具，选装
>
> `vim` 命令行编辑器，选装
>
> `dialog` 命令行 Wi-Fi 连接工具 `wifi-menu` 的依赖，推荐安装
>
> `grub``、dosfstools`、`efibootmgr` 启动引导，必装
>
> `os-prober` 为 `grub` 生成多系统菜单，选装
>
> `xf86-video-vesa`、`xf86-video-intel`、`xf86-video-nouveau`、`xf86-input-synaptics` 显卡驱动、触摸板驱动，必装
>
> `plasma` kde plasma 桌面环境，推荐安装 (当然也可以安装 `gnome` 等其他桌面，主要看个人喜好)
>
> `konsole` kde plasma 命令行环境，推荐安装
>
> `dolphin` kde plasma 文件管理器，推荐安装
>
> `bumblebee`、`bbswitch` 针对显卡的，我自己的小米 Pro 上需要安装，不然没法关机
>
> `networkmanager` 网络管理器，推荐安装
>
> `fcitx`、`fcitx-im`、`fcitx-configtool` fcitx 输入法，推荐安装

## 4、生成 fstab 文件

```bash
genfstab -U -p /mnt >> /mnt/etc/fstab
```

## 5、配置系统

首先，进入 chroot 环境

```bash
arch-chroot /mnt
```

### a. locale (本地化设置)

```bash
# 编辑 /etc/locale.gen
# 去注释
# en_US.UTF-8 UTF-8
# en_US ISO-8859-1
# zh_CN.GB18030 GB18030
# zh_CN.GBK GBK
# zh_CN.UTF-8 UTF-8
# zh_CN GB2312
# zh_TW.EUC-TW EUC-TW
# zh_TW.UTF-8 UTF-8
# zh_TW BIG5
vim /etc/locale.gen

# 重新生成 Locale
locale-gen

export LANG=en_US.UTF-8

# 设置可输入中文的英文环境
echo LANG=en_US.UTF-8 > /etc/locale.conf
echo LC_CTYPE=zh_CN.UTF-8 >> /etc/locale.conf
```

> 关于 `locale` 的设置可以参考 [locale的设定及LANG、LC_CTYPE、LC_ALL环境变量](https://www.cnblogs.com/xlmeng1988/archive/2013/01/16/locale.html)
>
> 我自己是需要设置一个可以输入中文的英文环境

### b. timezone (时区设置)

```bash
# 如果已经存在 /etc/localtime，创建链接会报错，先删除即可
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

### c. hostname (主机名设置)

```bash
echo HOST_NAME > /etc/hostname
```

自行设置 `HOST_NAME` 为自己喜欢的名称 (比如 abc) 即可

### d. network (使用 `networkmanager` 管理网络连接)

```bash
systemctl enable NetworkManager

# 如果没有装有 networkmanager，启用 dhcpcd 来自动获取 IP
# 一般是治安装了 base 基础环境是这样设置
systemctl enable dhcpcd
```

### e. password and user (设置 `root` 密码和添加普通用户)

```bash
# 设置 root 密码
passwd root
# 添加 jkl 用户，用于登录桌面环境
useradd -m jkl
# 设置 jkl 用户密码
passwd jkl
```

### f. grub (引导器的安装)

```bash
# 安装 grub 引导器
grub-install --target=x86_64-efi --efi-directory=/boot/efi \
--bootloader-id=Arch-Linux-Grub --recheck --debug
# 生成 grub 的引导菜单
grub-mkconfig -o /boot/grub/grub.cfg
```

如果是安装双系统的话，前面安装是提到的 `os-prober` 这个包是必要的，它可以 `grub-mkconfig` 时可以帮我们自动生成 `windows` 的 `grub` 启动项。

其中，`--efi-directory` 指向 EFI 分区挂载的位置，前面我们挂载到 `/boot/efi`，`--bootloader-id` 是在进入 `EFI—BIOS` 时显示的名称，这里设置为 `Arch-Linux-Grub`。

### g. 设置输入法 (fcitx)

比如我们待会儿用 `jkl` 用户登录到桌面环境，则需要在该用户家目录下建立 `.pam_environment`，并输入一下内容：

```bash
touch /home/jkl/.pam_environment
chown jkl:jkl /home/jkl/.pam_environment
vim /home/jkl/.pam_environment
------------------------------

GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fictx
```

### h. 设置默认启动桌面环境

```bash
# 前面安装 plasma 的时候会默认安装 sddm 了
systemctl enbale sddm bumblebeed
```

## 7、卸载分区、重启

此时，我们已经安装好了 Arch Linux，卸载之前挂载用来安装系统的分区并重启就好。可以在后边再安装桌面环境什么的。

```bash
exit
umount /mnt/boot/efi
umount /mnt/home
umount /mnt
reboot
```

## 8、重启到桌面环境

重启之后使用刚刚创建的 `jkl` 用户登录进去。下边的命令使用 `root` 身份进行一些简单配置：

### Ⅰ、Archlinuxcn 仓库

```bash
# 添加 archlinxcn 仓库
vim /etc/pacman.conf
--------------------

[archlinuxcn]
https://mirrors.ustc.edu.cn/archlinuxcn/$arch

# 安装 archlinxcn keyring
pacman -Sy archlinuxcn-keyring

# 安装 chrome、微信
pacman -S google-chrome electronic-wechat
```

### Ⅱ、安装一些常用软件

``` bash
# 安装 adobe 开源字体
pacman -S \
adobe-source-code-pro-fonts \
adobe-source-sans-pro-fonts \
adobe-source-serif-pro-fonts \
adobe-source-han-sans-cn-fonts \
adobe-source-han-sans-otc-fonts \
adobe-source-han-sans-tw-fonts \
adobe-source-han-serif-cn-fonts \
adobe-source-han-serif-otc-fonts \
adobe-source-han-serif-tw-fonts \

# 安装 exfat、ntfs 支持
pacman -S exfat-utils ntfs-3g

# 安装文本编辑器、pdf 阅读器、图片查看器、libre Office、atom 编辑器
pacman -S kate okular gwenview wps-office、atom
```

### Ⅲ、修改 grub 主题

安装好 `grub` 之后，默认只有 `starfield` 主题，并且处于未启用状态，我自己使用 `breeze` 主题。

需要自己下载下来，放在 `/boot/grub/themes` 下边

```bash
pacman -S git
git clone https://github.com/gustawho/grub2-theme-breeze.git
cp -r grub2-theme-breeze/breeze /boot/grub/themes
```

然后给 `grub` 启用 `breeze` 主题：

```bash
vim /etc/default/grub
---------------------

GRUB_THEME="/boot/grub/themes/breeze/theme.txt"
```

### Ⅳ、修改 sddm 主题

这里使用自带的 `breeze` 主题：

```bash
cp -r /usr/lib/sddm/sddm.conf.d /etc
vim /etc/sddm.conf.d/default.conf
---------------------

[Theme]
# Current theme name
Current=breeze

# Theme directory path
ThemeDir=/usr/share/sddm/themes
```

---
最后，享受你的 Archlinux 之旅。
