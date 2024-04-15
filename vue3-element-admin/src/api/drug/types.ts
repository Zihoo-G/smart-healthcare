/**
 * 药品查询对象类型
 */
export interface DrugQuery {
  name?: string;
  type?: number;
  license?: number;
  standard_code?: string;
}

/**
 * 药品分页对象
 */
export interface DrugPageVO {
  id?: number;
  name?: string;
  type?: string;
  description?: string;
  specifications?: string;
  manufacturer?: string;
  license?: string;
  dosage?: string;
  // 药品本位码
  standardCode?: string;
}
/**
 * 药品分页
 */
export type DrugPageResult = PageResult<DrugPageVO[]>;

export interface DrugOption {
  id: number;
  name: string;
}
