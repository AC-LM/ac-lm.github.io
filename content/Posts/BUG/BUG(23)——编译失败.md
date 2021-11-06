



configure: error: no acceptable C compiler found in $PATH



缺少合适的编译器

yum install gcc-c++

gcc为GNU Compiler Collection的缩写，可以编译C和C++源代码等，它是GNU开发的C和C++以及其他很多种语言的编译器（最早的时候只能编译C，后来很快进化成一个编译多种语言的集合，如Fortran、Pascal、Objective-C、Java、Ada、 Go等。）
gcc在编译C++源代码的阶段，只能编译C++源文件，而不能自动和C++程序使用的库链接（编译过程分为编译、链接两个阶段，源程序文件被编译成目标文件，多个目标文件连同库被链接成一个最终的可执行文件，可执行文件被加载到内存中运行）。因此，通常使用g++命令来完成C++程序的编译和连接，该程序会自动调用 gcc 实现编译。
g++也能编译C源代码，只不过把会把它当成C++源代码。后缀为.c的源文件，gcc把它当作是C程序，而g++把它当作是c++程序；后缀为.cpp的，两者都会认为是c++程序。注意，虽然c++是c的超集，但是两者对语法的要求是有区别的。