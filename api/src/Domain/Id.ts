import { AbstractStringVo } from './AbstractStringVo'
import { uuidv7 } from 'uuidv7'

export default class Id extends AbstractStringVo<Id> {
  static create (): Id {
    return new Id(uuidv7())
  }

  static fromString (value: string): Id {
    return new Id(value)
  }
}
