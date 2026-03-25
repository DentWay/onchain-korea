import { week1Lessons } from './week1'
import { week2Lessons } from './week2'
import { week3Lessons } from './week3'
import { week4Lessons } from './week4'
export { hiddenTopicContents } from './hidden'

export const lessonContents = {
  ...week1Lessons,
  ...week2Lessons,
  ...week3Lessons,
  ...week4Lessons,
}
