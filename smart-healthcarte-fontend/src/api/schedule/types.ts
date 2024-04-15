export interface Doctor {
  id: number
  name: string
  sex: number
  type: string
  url: string
  uid: string
  description: string
}

export interface ScheduleInfo {
  id: number
  date: Date
  deptId: number
  did: number
  number: number
  doctor: Doctor
}
