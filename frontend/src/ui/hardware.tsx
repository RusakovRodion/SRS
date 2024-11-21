export interface Hardware {
  id: number
  name: string
  brand: string
  model: string
  description: string
  added: string
  type_id: number
}

export interface HardwareType {
  id: number
  name: string
}