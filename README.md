# 项目总结

### props

props 接收的值是具有响应式的，但也正因为如此，使用 es6 的结构后会丢失其响应式性，但是 可以通过 toRefs 解构来保持其响应性

    import { toRefs, PropType } from 'vue'

    export default {
        props: {
            currentId: {
            type: String as PropType<string>,
            default: ''
            }
        },
        setup(props) {
            const { currentId } = toRefs(props)
            console.log(currentId.value)
        }
    }

### context 上下文

context 上下文 向外暴露三个组件的 property： attrs(非响应对象)、slots(非响应对象)、emit, 文档中说 因为其不是响应式的可以放心的结构

    // 可以这么写
    export default {
        setup(props, context) {
            // Attribute (非响应式对象)
            console.log(context.attrs)

            // 插槽 (非响应式对象)
            console.log(context.slots)

            // 触发事件 (方法)
            console.log(context.emit)
        }
    }

    // 或者这样写
    export default {
        setup(props, { attrs, slots, emit }) {
            ...
        }
    }

### 组件的注册

同步（个人认为的同步）

    import test1 from './test1'
    export default {
        // 注册组件
        components: {
            test1
        }
    }

异步注册 defineAsyncComponent api

    import { ref, defineAsyncComponent } from 'vue'
    export default {
        // 注册组件
        components: {
            test1: defineAsyncComponent(() => import('./test1'))
        }
    }

### ref

ref 这个 api 其实有点特殊，它作用与组件时获取的是组件自身，它又能创建响应式对象。

在 setup 中获取组件的 ref 对象

    // 在组件上声明其ref ， 在setup函数中创建 与组件ref同名ref对象 并导出
    <template>
        <!-- 同名ref -->
        <test1 ref="test1Ref"></test1>
    </template>
    <script>
        import { ref } from 'vue'
        // 导入组件
        import test1 from './test1'
        export default {
            // 注册组件
            components: {
                test1
            },
            setup () {
                // 创建同名ref
                const test1Ref = ref(null)
                // 导出ref
                return {
                    test1Ref
                }
            }
        }
    </script>
    <style scoped></style>

> 需要注意的是 异步注册的组件 无法正确获取 ref 对象

使用 setup 函数 与 el 表单结合使用时 不要让 ref 和 model 绑定同一个对象，这个会造成很奇怪的现象，如果页面循环调用爆栈： `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`

表单无法赋值 （因为 ref 是只读对象 赋值会抛出警告）

### 数据监听

#### watch

这个其实与 2.0 并无太大区别，需要注意的是 其接收一个响应式对象 immediate 立即执行一次 无论值是否变化 deep 深度监听 常用与 对象

    setup (props) {
        watch(
            () => props.id,
            () => {
                console.log(props.id)
            },
            { immediate: true }
        )
        return {}
    }
    // watch 还可以监听多个数据，具体查看文档吧

#### watchEffect

对于 watchEffect , 我的理解是： 你把需要更新的字段，放在 watchEffect 函数里，字段改变时 watchEffect 函数会自动执行。

    const count = ref(0)

    watchEffect(() => console.log(count.value))
    // -> logs 0

    setTimeout(() => {
        count.value++
        // -> logs 1
    }, 100)

#### computed

computed 跟 vue2 区别不大,但是注意， 它返回的是 不可变的反应性 ref 对象。

    const count = ref(1)
    const plusOne = computed(() => count.value + 1)
    console.log(plusOne.value) // 2
    plusOne.value++ // error

但是它也可以使用具有 get 和 set 函数的对象来创建可写的 ref 对象。

    const count = ref(1)
    const plusOne = computed({
    get: () => count.value + 1,
    set: val => {
        count.value = val - 1
    }
    })
    plusOne.value = 1
    console.log(count.value) // 0

### Provide / Inject

在 setup() 中使用 provide 时，我们首先从 vue 显式导入 provide 方法。这使我们能够调用 provide 时来定义每个 property。

provide 函数允许你通过两个参数定义 property：

    1. property 的 name (<String> 类型)
    2. property 的 value

使用组件，我们提供的值( provide )可以按如下方式:

    <script>
        import Children from '../components/Children'
        import { provide } from 'vue'
        export default {
            components: {
                Children
            },
            setup() {
                provide('location', 'http://baidu.com')
                provide('geolocation', {
                    longitude: 90,
                    latitude: 135
                })
            },
        }
    </script>

在 setup() 中使用 inject 时，还需要从 vue 显式导入它。一旦我们这样做了，我们就可以调用它来定义如何将它暴露给我们的组件。

inject 函数有两个参数：

    1. 要注入的 property 的名称
    2. 一个默认的值 (可选)

使用子组件，可以使用以下代码进行接收：

    <script>
        import { inject } from 'vue'
        export default {
            name: 'children',
            setup() {
                const location = inject('location')
                const geolocation = inject('geolocation')

                return {
                    location,
                    geolocation
                }
            }
        }
    </script>

当然，我们也可以为 provide 和 inject 设计成响应式数据， 只需要在使用它们的时候引入 ref 或者 reactive， 代码如下：

    <script>
        import Children from '../components/Children'
        import {provide, ref, reactive} from 'vue'
        export default {
            components: {
                Children
            },
            setup() {
                const location = ref('http://baidu.com')
                const geolocation = reactive({
                    longitude: 90,
                    latitude: 135
                })
                provide('location', location)
                provide('geolocation', geolocation)
            },
        }
    </script>

如此， 这两个 property 中有任何更改，Children 组件也将自动更新， 是不是很酷！

但是这里有个需要注意的点， 如果我们需要修改 provide 的数据， 建议在 provide 提供数据的组件中修改，而不建议在使用 inject 的组件中修改数据，所以我们可以在 provide 中提供一个修改数据的方法并通过 provide 传递出去，例如：

    <template>
        <Children />
    </template>

    <script>
    import Children from '../components/Children'
    import {provide, ref, reactive, readonly} from 'vue'
    export default {
        components: {
            Children
        },
        setup() {
            const location = ref('http://baidu.com')
            const geolocation = reactive({
                longitude: 90,
                latitude: 135
            })
            const updateLocation = () => {
                location.value = "http://lynn92.com"
            }
            provide('location', readonly(location)) // 为了防止数据被子组件更改，我们使用 readonly 函数进行一个包装，这样提供出去的数据就不会被组件更改
            provide('geolocation', readonly(geolocation))
            provide('updateLocation', updateLocation) // 提供一个修改数据的方法
        },
    }
    </script>

    // Children.vue
    <template>
        <div>{{ location }} - {{ geolocation }}</div>
    </template>

    <script>
    import { inject } from 'vue'
    export default {
        name: 'Children',
        setup() {
            const location = inject('location')
            const geolocation = inject('geolocation')
            const updateLocation = inject('updateLocation')
            return {
                location,
                geolocation,
                updateLocation
            }
        }
    }
    </script>

### 配置 eslint 规范代码

网上教程一大堆，但是 vue3 的版本目前好多写的很混乱，这里我进行了一些整理：

需要安装如下几个插件：

    1. @typescript-eslint/eslint-plugin // 用于校验 typescript 语法
    2. @typescript-eslint/parser // typescript 解析器
    3. eslint // eslint
    4. eslint-config-prettier // 用于关闭所有不必要的规则或可能与Prettier冲突的规则
    5. eslint-plugin-vue // vue3 语法校验
    6. prettier // prettier

前提声明： 本人使用的是 `vite2.x` 的脚手架生成的 `vue3 typescript` 版本，所以，以上插件针对的都是规范 `vue3` 的语法以及 `typescript` 的语法问题， 至于校验 `typescript` 中的类型， 你需要安装 `vue-tsc` 插件， 这里没有介绍是因为 `vite` 生成的架子中集成了这个插件以及`typescript`，如果你只是想规范代码， 那么按照教程可以配置。

进入正题， 插件安装完毕之后，我们在根目录创建一个名称叫 `.eslintrc.json` 的文件， 并输入如下代码：

    {
        "parser": "vue-eslint-parser", // 首先我们需要使用 vue 的解析器
        // parserOptions 是用来配置我们自定义的 解析器， 注意 ， vue-eslint-parser 官方文档明确说明了，如果你的配置是放在这个字段内， 所有的功能都将失效
        "parserOptions": {
            "parser": "@typescript-eslint/parser", // 然后使用 @typescript-eslint/parser 来解析 typescript
            "ecmaVersion": 2020,
            "sourceType": "module"
        },
        // extends 是用来配置插件的 推荐规则， 前面带 plugin的意思是，它同时会安装插件的意思，也就是他会在 plugins 字段中自动导入，相当于是简写的意思
        "extends": [
            "plugin:vue/vue3-recommended", // vue3 推荐规则，如果需要 vue2 的官方文档也有说明
            "eslint:recommended", // 这个是 eslint 的推荐规则
            "plugin:@typescript-eslint/recommended", // @typescript-eslint 推荐规则， 注意他也是带 plugin 前缀， 所以不需要在 plugins 字段中配置
            "plugin:prettier/recommended" // 这个同理， prettier 的推荐规则 ， 注意， 它必须放在数组的最后 ，因为它可以保证能够覆盖前面的那些配置，也就可以解决 与eslint 的冲突
        ],
        // 这个字段用于配置规则
        "rules": {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "vue/no-mutating-props": "off",
            "@typescript-eslint/no-explicit-any": ["off"],
            "vue/require-default-prop": "off"
        }
    }

如此， 我们把所有的配置步骤都写好了， 接着我们来定义格式化代码的规范文件， 在根目录新建 `.prettierrc` 文件， 输入以下代码：

    {
        "printWidth": 130, // 长度， 可用于控制代码换行
        "tabWidth": 4, // 缩进
        "useTabs": false,
        "semi": false,
        "vueIndentScriptAndStyle": true,
        "singleQuote": true,
        "quoteProps": "as-needed",
        "bracketSpacing": true,
        "trailingComma": "none",
        "jsxBracketSameLine": false,
        "jsxSingleQuote": false,
        "arrowParens": "always",
        "insertPragma": false,
        "requirePragma": false,
        "proseWrap": "never",
        "htmlWhitespaceSensitivity": "strict",
        "endOfLine": "lf"
    }

不一一写注释了，大家不明白的可以去 `prettier` 官网中查看， 文末会有各插件的官网地址。

到了这里， 我们还需要把 `vscode` 的 配置改一下，请接着看代码：

    {
        // prettier 开头的都是 prettier 的全局配置， 因为每个项目的规范都一样，所以我这里做了全局配置
        "prettier.printWidth": 130,
        "prettier.tabWidth": 4,
        "prettier.useTabs": false,
        "prettier.semi": false,
        "prettier.vueIndentScriptAndStyle": true,
        "prettier.singleQuote": true,
        "prettier.quoteProps": "as-needed",
        "prettier.bracketSpacing": true,
        "prettier.trailingComma": "none",
        "prettier.jsxBracketSameLine": false,
        "prettier.jsxSingleQuote": false,
        "prettier.arrowParens": "always",
        "prettier.insertPragma": false,
        "prettier.requirePragma": false,
        "prettier.proseWrap": "never",
        "prettier.htmlWhitespaceSensitivity": "strict",
        "prettier.endOfLine": "lf",

        // 保存的时候 自动修复
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": false
        },

        // vue ， jsonc ，json，typescript 文件 使用 prettier 格式化
        "[vue]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[jsonc]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[json]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[typescript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
    }

最后，我们在 `package.json` 文件中配置下脚本命令:

    {
        "scripts": {
            "dev": "vite",
            "build:tsc": "vue-tsc --noEmit && vite build", // 这个命令是打包生产环境代码的， 他会进行 typescript 的类型校验
            "serve": "vite preview",
            "eslint": "eslint --ext .js,.vue,.ts src --fix" // eslint 命令， 每次提交代码前可以先跑一下这个命令再进行提交
        },
    }

到此结束， 如果你们觉得每次提交都要跑一下这个命令嫌麻烦， 那么你可以尝试着去配置 git hook ，网上教程也是很多， 它是 git 的钩子， 会在 git commit 的时候执行你提供的脚本命令， 如果失败会 commit 失败， 这里不在叙述。

本文 全是由本人在开发新项目的时候所做所踩的坑，如果有理解不对或者叙述不对的地方， 欢迎更正。

- @typescript-eslint/eslint-plugin: <https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md>
- eslint: <https://eslint.org/>
- eslint-config-prettier: <https://github.com/prettier/eslint-config-prettier#installation>
- eslint-plugin-vue: <https://eslint.vuejs.org/>
- prettier: <https://prettier.io/>
