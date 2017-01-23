import {observable, computed} from 'mobx'
import {ListView} from 'react-native'

export default class PageListRequest {
    constructor(api, args) {
        //列表api
        this.api = api
        this.args = args || {}

        //下一次发送请求的page
        this.nextPageNumber = 1

        //每次请求的列表大小
        this.pageSize = 20
    }

    //是否正在加载
    @observable
    isLoading = false

    //是否在下来刷新，用来区分上啦刷新和下拉刷新
    @observable
    isRefresh = false

    @observable
    dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2})

    @observable
    data = []

    //当前返回的列表大小
    @observable
    totalPropertyCount = 0

    loadNextPage = () => {
        if (this.isLoading || this.isOver) {
            //不发送请求
            return null
        }
        this.isRefresh = false
        this.loadData()
    }

    refreshPage = () => {
        console.log('refreshPage')
        if(this.isLoading) {
            //不发生请求
            return
        }
        this.isRefresh = true
        this.nextPageNumber = 1
        this.loadData()
    }

    @computed get isOver(){
        return this.totalPropertyCount == 0 || this.totalPropertyCount < this.pageSize
    }

    loadData = async () => {
        try {
            this.isLoading = true
            //获取结果
            const responseJson = await this.api(this.nextPageNumber, this.pageSize,this.args)
            //更新页码状态
            const result = responseJson.statuses || responseJson.comments
            this.totalPropertyCount = result.length
            this.nextPageNumber++
            this.isLoading = false
            //返回结果
            if(this.isRefresh) {
                this.isRefresh = false
                this.data = result
                this.dataSource = this.dataSource.cloneWithRows(this.data.slice())
            } else {
                this.data = this.data.concat(result)
                this.dataSource = this.dataSource.cloneWithRows(this.data.slice())
            }
        } catch (error) {
            this.isLoading = false
            console.log(error)
        }
    }
}