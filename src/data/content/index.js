import { week1Lessons } from './week1'
import { week2Lessons } from './week2'
import { week3Lessons } from './week3'
import { week4Lessons } from './week4'
export { hiddenTopicContents } from './hidden'

// Phase 2
export { phase2LessonContents, phase2HiddenTopicContents } from './phase2'

export const lessonContents = {
  ...week1Lessons,
  ...week2Lessons,
  ...week3Lessons,
  ...week4Lessons,
}
