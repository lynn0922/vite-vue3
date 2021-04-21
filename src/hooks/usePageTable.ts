import { ElMessage } from 'element-plus';
import { nextTick } from 'vue'

// 处理参数
function handleParams(props: any) {
    const obj: any = {}
    for (const key in props.query) {
        if (props.query[key] || props.query[key] === 0) {
            obj[key] = props.query[key]
        }
    }
    // 如果不需要分页，则无分页相关参数
    return props.pager ? { ...props.listInfo.query, ...obj } : obj
}

export function getList(api: any, props: any, context: any, tableRef: any) {
    props.listInfo.loading = true

    return new Promise((resolve, reject) => {
        // 每次调用接口时都自动绑定最新的数据
        api(handleParams(props))
            .then((res: any) => {
                props.listInfo.loading = false
                if (res.code === 0) {
                    // 使外面可以访问到表格数据
                    const arr = Array.isArray(res.data) ? res.data : res.data
                    context.$emit('update:data', arr)
                    if (props.pager) {
                        // 总条数
                        props.listInfo.total = res.total
                    }
                    // 设置当前选中项
                    props.checkedList.forEach((selected: any) => {
                        const row = arr.find((item: any) => {
                            return item.id === selected
                        })
                        nextTick(() => {
                            if (!row) return
                            tableRef.toggleRowSelection(row, true)
                        })
                    })
                    resolve(res)
                    context.$emit('handleEvent', 'list', arr)
                } else {
                    ElMessage.error(res.message)
                    reject()
                }
            })
            .catch(() => {
                reject()
                props.listInfo.loading = false
            })
    })
}
