
export default {
    data() {
        return {
            //每一个区域的高度
            codeParent: [],
            codeHeightArr: [],
            //每个区域的显示状态
            isShow: [],
        }
    },
    methods: {
        //根据子元素的高度 设置代码区域父元素的高度
        showCode(index) {
            const that = this//(this as any);
            that.$set(that.isShow, index, !that.isShow[index])
            that.$nextTick(() => {
                if (that.isShow[index] === true) {
                    that.codeParent[index].style.height = +that.codeHeightArr[index] + 25 + 'px'
                } else {
                    that.codeParent[index].style.height = 0
                }
            })
        },
        //得到所有代码区域的高度
        getCodesHeight() {
            const that = this//(this as any);
            const arr = document.getElementsByClassName('code-content-height')
            that.codeParent = document.getElementsByClassName('code-content')
            const arrLength = arr.length
            for (let i = 0; i < arrLength; i++) {
                that.codeHeightArr.push(arr[i].getBoundingClientRect().height)
                that.isShow.push(false)
            }
        },
    },
    mounted() {
        const that = this//(this as any);
        //异步获取当前组件内部 code区域的高度 以便于给点击的时候使用
        that.$nextTick(() => {
            that.getCodesHeight()
        })
    },
}