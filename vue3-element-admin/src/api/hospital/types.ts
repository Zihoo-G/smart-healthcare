/**
 * 科室
 */
export interface TreeNode {
  id: number;
  name?: string;
  children?: TreeNode[];
}

/**
 * 医生查询参数
 */
export interface DoctorQuery {
  name?: string;
  deptId?: number;
  uid?: string;
}

/**
 * 医生分页对象
 */
export interface DoctorPageVO {
  id?: number;
  uid?: number;
  name?: string;
  sex?: number;
  type?: string;
  create_time?: Date;
  update_time?: Date;
}

/**
 * 医生分页
 */
export type DoctorPageResult = PageResult<DoctorPageVO[]>;

/**
 * 医生表单对象
 */

export interface DoctorForm {
  id?: number;
  uid?: number;
  deptId?: number;
  name?: string;
  sex?: number;
  type?: string;
  url?: string;
}

export interface PatientQueryForm {
  id: number;
  date: string;
  name?: string;
}

export interface CheckInfo {
  uid: number;
  descriptionArray: Array<string>;
  description?: string;
}
