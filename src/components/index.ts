import { App } from 'vue'
import pageTable from './PageTable/PageTable.vue'
import PageDialog from './PageDialog/PageDialog.vue'
import PageForm from './PageForm/PageForm.vue'

export const compList = [pageTable, PageDialog, PageForm]

export function useGlobComp(app: App) {
    compList.forEach((comp: any) => {
        app.component(comp.name || comp.displayName, comp)
    })
}
