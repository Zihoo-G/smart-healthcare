/**
 * 供应商查询参数
 */
export type ManufacturerQuery = {
  name?: string;
  address?: string;
};

/**
 * 供应商分页对象
 */
export interface ManufacturerPageVO {
  id?: number;
  name?: string;
  address?: string;
  approval?: string;

  create_time?: Date;
  update_time?: Date;
}

/**
 * 供应商分页
 */
export type ManufacturerPageResult = PageResult<ManufacturerPageVO[]>;

/**
 * 供应商表单对象
 */
export interface ManufacturerForm {
  id?: number;
  name?: string;
  address?: string;
  approval?: string;
}
