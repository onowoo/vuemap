import { request } from './axios'

export class UserService {       // 用户模块

    static async getConfig(params) {   // 全局数据
        return request('/addons/cms/api.common/init',params, 'get')
    }
    static async getCaptcha(params) {   // 验证码
        return request('/addons/cms/api.common/captcha',params, 'get')
    }
    static async getEmsSend(params) {   // 邮件验证码
        return request('/addons/cms/api.ems/send',params, 'post')
    }
    static async getSmsSend(params) {   // 短信验证码
        return request('/addons/cms/api.sms/send',params, 'post')
    }
    static async getUserIndex(params) {   // 个人中心
        return request('/addons/cms/api.user/index',params, 'get')
    }
    static async getUserProfile(params) {   // 个人资料
        return request('/addons/cms/api.user/profile',params, 'post')
    }
    static async goUserLogout(params) {   // 注销登录
        return request('/addons/cms/api.user/logout',params, 'get')
    }
    static async goUserAvatar(params) {   // 保存头像
        return request('/addons/cms/api.user/avatar',params, 'post')
    }
    static async getUserInfo(params) {   // 用户信息
        return request('/addons/cms/api.user/userInfo',params, 'post')
    }
    static async goLogin(params) {   // 用户登录
        return request('/addons/cms/api.login/login',params, 'post')
    }
    static async mobilelogin(params) {   // 手机登录
        return request('/addons/cms/api.login/mobilelogin',params, 'post')
    }
    static async goRegister(params) {   // 用户注册
        return request('/addons/cms/api.login/register',params, 'post')
    }
    static async goResetpwd(params) {   // 重制密码
        return request('/addons/cms/api.login/resetpwd',params, 'post')
    }
    static async getCategory(params) { //二级栏目
        return request('/addons/cms/api.common/getCategory',params, 'get')
    }
}

export class PageArchives {     // 栏目文章单页

    static async getArchives(params) {   //列表页
        return request('/addons/cms/api.archives/index',params, 'get')
    } 
    static async getArchivesDetail(params) { //详情页
        return request('/addons/cms/api.archives/detail',params, 'post')
    }
    static async getArchivesVote(params) { //赞与踩
        return request('/addons/cms/api.archives/vote',params, 'post')
    }
    static async getArchivesOrder(params) { //提交订单接口
        return request('/addons/cms/api.archives/order',params, 'post')
    }
    static async getChannel(params) { //获取栏目接口，一般用于发布文章时调用
        return request('/addons/cms/api.archives/get_channel',params, 'get')
    }
    static async getChannelFields(params) { //获取栏目字段列表，一般用于发布文章
        return request('/addons/cms/api.archives/get_channel',params, 'get')
    }
    static async archivesPost(params) { //提交数据，发布文档
        return request('/addons/cms/api.archives/archives_post',params, 'post')
    }
    static async goCommentPost(params) { //发表评论
        return request('/addons/cms/api.comment/post',params, 'post')
    }
    static async goCommentIndex(params) { //文档评论列表接口
        return request('/addons/cms/api.comment/index',params, 'post')
    }
    static async search(params) { //搜索
        return request('/addons/cms/api.search/index',params, 'get')
    }   
    static async tagIndex(params) { //标签
        return request('/addons/cms/api.tag/index',params, 'get')
    }
    static async getCategory(params) { //二级栏目
        return request('/addons/cms/api.common/getCategory',params, 'get')
    }
    static async getPageDetail(params) { //二级栏目
        return request('/addons/cms/api.page/detail',params, 'get')
    }
    static async getCollection(params) { //收藏
        return request('/addons/cms/api.collection/index',params, 'get')
    }
    static async addCollection(params) { //添加到收藏 (id, 'archives')
        return request('/addons/cms/api.collection/create',params, 'post')
    }
    static async delCollection(params) { //删除自收藏
        return request('/addons/cms/api.collection/delete',params, 'post')
    }
}
