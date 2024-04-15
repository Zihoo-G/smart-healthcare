/**
 * 用户表单
 */
export interface UserForm {
  username: string
  password: string
}

/**
 * 用户信息
 */
export interface UserInfo {
  id?: number
  username?: string
  roles?: string[]
}

/**
 * 用户检查信息
 */
export interface CheckInfo {
  id: number
  description: string
  isDeleted: number
  uid: number
  createTime: Date
  updateTime: Date
  params: string
}

/**
 * 用户处方信息
 */
export interface Recipe {
  dname: string
  number: number
  price: number
  isOutBound: number
}
