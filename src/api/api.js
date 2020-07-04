//服务器地址
const http="http://39.101.217.150:8086"
//登陆地址
const login='/account/login'
//菜单列表
const listForRouter = '/menu/listForRouter'
//用户信息
const userInfo = '/account/info'
//修改用户密码
const updatePwd= '/account/updatePwd'
//获取分类下文章数
const articlebychannel = '/article/articlebychannel'
//获取文章分类信息
const channelList = '/channel/list'
//获取功能项操作信息
const menuList = '/menu/list'
//获取用户列表
const userList = '/user/list'
//获取部门列表
const deptList = '/dept/list'
//添加&修改用户
const user = '/user'
//获取角色树 
const roleTree = '/role/roleTreeListByIdUser'
// 设置角色
const setRole = '/user/setRole'
//获取&搜索角色列表
const roleList = '/role/list'
//添加&删除&修改角色
const role = '/role'
// 根据id删除部门
const dept = '/dept'
// 添加修改菜单
const menu = '/menu'
export {
  http,
  login,
  listForRouter,
  userInfo,
  updatePwd,
  articlebychannel,
  channelList,
  menuList,
  userList,
  deptList,
  user,
  roleTree,
  setRole,
  roleList,
  role,
  dept,
  menu
}