export interface Department {
  id: number
  name: string
  children?: Department[]
}

export interface DepartmentInfo {
  id?: number
  name?: string
  description?: string
}
