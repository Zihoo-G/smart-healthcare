export interface RobotMessage {
  message: string
  number: number
}

export interface HumanMessage {
  message: string
}

export interface Message {
  robot: RobotMessage
  human?: HumanMessage
}
