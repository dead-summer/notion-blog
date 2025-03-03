import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

/**
 * 配置 单个 note
 */
const HMJavaWeb = defineNoteConfig({
  dir: '黑马程序员 JavaWeb',
  link: '/itheima-javaweb/',
  sidebar: 'auto',
})

const HSPJava = defineNoteConfig({
  dir: '韩顺平 Java 教程',
  link: '/hsp-java/',
  sidebar: 'auto',
})

/**
 * 配置 notes
 */
export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [HSPJava, HMJavaWeb],
})
