import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Brain, GitBranch, Zap, Code2, Terminal, Cpu, Database,
  Mail, ArrowRight, ExternalLink, Sparkles, Layers,
  Workflow, MessageSquare, ChevronDown
} from 'lucide-react'

/* ============================================================
   数据
   ============================================================ */
const PROJECTS = [
  {
    name: 'CortexLab',
    desc: '数字员工大脑架构实验室 — 3D 人体隐喻可视化 AgentTeams SDK 架构、大脑适配流程与多宿主接入',
    tags: ['React', 'Three.js', 'React Flow', 'Neo Kinpaku'],
    url: 'https://github.com/siYuanJun/cortexlab',
    color: '#d4af37',
    icon: Brain,
    featured: true,
  },
  {
    name: 'Harness Team System',
    desc: 'AI 多 Agent 团队体系：团队搭建方法论 + 搭团队元工具 + 派任务元工具 + 垂直团队实例',
    tags: ['Claude Code', 'Agent Teams', 'Methodology'],
    url: 'https://github.com/siYuanJun/harness-team-system',
    color: '#4a9d8f',
    icon: Workflow,
    featured: true,
  },
  {
    name: 'Skill Flow Viz',
    desc: 'Skill 工程可视化：把 SKILL.md 的执行脉络翻译为流程图 + 时间轴 + 信息卡',
    tags: ['Visualization', 'Skill Engineering'],
    url: 'https://github.com/siYuanJun/skill-flow-viz',
    color: '#b8941f',
    icon: Layers,
  },
  {
    name: 'Ontology Brain Visual',
    desc: '本体工程师数字员工展示层：Harness 团队 + Skill 工程的对外可视化（Dashboard / KPI / 时间轴）',
    tags: ['Dashboard', 'Digital Employee'],
    url: 'https://github.com/siYuanJun/ontology-brain-visual',
    color: '#6bb5a5',
    icon: Cpu,
  },
  {
    name: 'Interview Tiger',
    desc: '本地化 AI 面试辅助工具：实时录制面试官语音，AI 生成贴合你个人背景的回答建议',
    tags: ['AI Tool', 'Local-first', 'Audio'],
    url: 'https://github.com/siYuanJun/interview-tiger',
    color: '#e8d5a3',
    icon: MessageSquare,
  },
  {
    name: 'Showcase',
    desc: '工程作品集：业务工程 ×4 + 方法论工程 ×5 的统一可视化索引（纯静态 HTML，在线浏览）',
    tags: ['Portfolio', 'Static HTML'],
    url: 'https://siyuanjun.github.io/showcase/',
    color: '#8b7d5c',
    icon: Sparkles,
  },
]

const SKILLS = [
  { name: 'AI Agent', icon: Brain, level: 'expert' },
  { name: 'Skill 工程', icon: Layers, level: 'expert' },
  { name: 'Harness 编排', icon: Workflow, level: 'expert' },
  { name: 'Claude Code', icon: Terminal, level: 'expert' },
  { name: 'Python', icon: Code2, level: 'advanced' },
  { name: 'TypeScript', icon: Code2, level: 'advanced' },
  { name: 'React', icon: Cpu, level: 'advanced' },
  { name: 'FastAPI', icon: Zap, level: 'advanced' },
  { name: 'LLM / RAG', icon: Database, level: 'advanced' },
  { name: 'Three.js', icon: Sparkles, level: 'intermediate' },
  { name: 'Vue', icon: Cpu, level: 'intermediate' },
  { name: 'Git', icon: GitBranch, level: 'expert' },
]

const DIRECTIONS = [
  {
    icon: Layers,
    title: 'Skill 工程',
    desc: '将方法论与工作流蒸馏为可复用的 Agent Skills，让经验可沉淀、可调度、可传承',
    color: '#d4af37',
  },
  {
    icon: Workflow,
    title: 'Harness 编排',
    desc: '为任意项目构建可被 Claude Code 调度的多 Agent 团队，让 AI 从单次对话变为工程化生产力',
    color: '#4a9d8f',
  },
  {
    icon: Zap,
    title: 'AI 应用落地',
    desc: '面向真实场景的 AI 工具与产品，从面试辅助到数字员工，让 AI 真正解决实际问题',
    color: '#b8941f',
  },
]

/* ============================================================
   组件
   ============================================================ */

// 导航栏
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8, 7, 5, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-rule)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--color-kinpaku)', borderRadius: '2px' }}>
            <Brain size={18} style={{ color: 'var(--color-lacquer)' }} />
          </div>
          <span className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)' }}>
            Lujo
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['关于', '项目', '技能', '联系'].map((item, i) => (
            <a
              key={i}
              href={`#${['about', 'projects', 'skills', 'contact'][i]}`}
              className="text-sm transition-colors hover:text-[var(--color-kinpaku)]"
              style={{ color: 'var(--color-graphite-light)' }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://github.com/siYuanJun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 text-sm transition-all hover:opacity-80"
            style={{ border: '1px solid var(--color-rule-strong)', borderRadius: '2px', color: 'var(--color-champagne)' }}
          >
            <GitBranch size={14} />
            GitHub
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

// Hero 区
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* 背景光晕 */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(212, 175, 55, 0.08)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(74, 157, 143, 0.06)' }} />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="tag tag-gold">
            <Sparkles size={10} className="mr-1.5" />
            AI Agent 工程实践者
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-light mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)', letterSpacing: '-0.02em' }}
        >
          热爱不止于代码
          <br />
          <span className="text-gold-gradient">全心投入 AI 探索之旅</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--color-graphite-light)', lineHeight: 1.8 }}
        >
          专注 <span style={{ color: 'var(--color-kinpaku)' }}>Skill 工程</span> 与{' '}
          <span style={{ color: 'var(--color-patina)' }}>Harness 编排</span>
          ——把 AI 从「单次对话助手」推进为「可编排、可治理、可复用」的工程化生产力。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:scale-105 glow-gold"
            style={{ background: 'var(--color-kinpaku)', color: 'var(--color-lacquer)', borderRadius: '2px' }}
          >
            查看精选项目
            <ArrowRight size={16} />
          </a>
          <a
            href="https://github.com/siYuanJun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:opacity-80"
            style={{ border: '1px solid var(--color-rule-strong)', color: 'var(--color-champagne)', borderRadius: '2px' }}
          >
            <GitBranch size={16} />
            GitHub 主页
          </a>
        </motion.div>
      </div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} style={{ color: 'var(--color-graphite)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// 核心方向
function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8" style={{ background: 'var(--color-kinpaku)' }} />
            <h2 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)' }}>
              核心方向
            </h2>
          </div>
          <p className="text-base max-w-2xl" style={{ color: 'var(--color-graphite-light)' }}>
            三个方向，一条主线——让 AI 真正工程化、可复用、可治理。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {DIRECTIONS.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="panel p-8 relative overflow-hidden group"
            >
              <div
                className="absolute top-0 left-0 w-full h-0.5 transition-all duration-300 group-hover:h-1"
                style={{ background: d.color }}
              />
              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{ background: `${d.color}15`, borderRadius: '2px' }}
              >
                <d.icon size={24} style={{ color: d.color }} />
              </div>
              <h3 className="text-xl font-medium mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)' }}>
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-graphite-light)' }}>
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 精选项目
function Projects() {
  return (
    <section id="projects" className="py-24 px-6" style={{ background: 'var(--color-lacquer-deep)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8" style={{ background: 'var(--color-patina)' }} />
            <h2 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)' }}>
              精选项目
            </h2>
          </div>
          <p className="text-base max-w-2xl" style={{ color: 'var(--color-graphite-light)' }}>
            从方法论到工具，从数字员工到个人辅助——每个项目都是 AI 工程化的一次实践。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="panel p-6 relative overflow-hidden group block"
            >
              {p.featured && (
                <div className="absolute top-4 right-4">
                  <span className="tag tag-gold">精选</span>
                </div>
              )}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}15`, borderRadius: '2px' }}
                >
                  <p.icon size={20} style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium mb-1 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)' }}>
                    {p.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: p.color }} />
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-graphite-light)' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag, j) => (
                  <span key={j} className="tag" style={{ color: 'var(--color-graphite-light)', borderColor: 'var(--color-rule)', background: 'transparent' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ background: p.color, width: p.featured ? '100%' : '0%' }}
              />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/siYuanJun?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-kinpaku)]"
            style={{ color: 'var(--color-graphite-light)' }}
          >
            查看全部仓库
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// 技术栈
function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8" style={{ background: '#b8941f' }} />
            <h2 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)' }}>
              技术栈
            </h2>
          </div>
          <p className="text-base max-w-2xl" style={{ color: 'var(--color-graphite-light)' }}>
            从 AI Agent 工程到全栈开发，工具服务于目标。
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="panel p-5 flex items-center gap-3"
            >
              <s.icon size={20} style={{ color: 'var(--color-kinpaku)', flexShrink: 0 }} />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--color-champagne)' }}>{s.name}</div>
                <div className="text-[10px]" style={{ color: 'var(--color-faint)', fontFamily: 'var(--font-mono)' }}>
                  {s.level === 'expert' ? '精通' : s.level === 'advanced' ? '熟练' : '了解'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 联系方式
function Contact() {
  return (
    <section id="contact" className="py-24 px-6" style={{ background: 'var(--color-lacquer-deep)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-8" style={{ background: 'var(--color-kinpaku)' }} />
            <h2 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)' }}>
              保持联系
            </h2>
            <div className="w-1 h-8" style={{ background: 'var(--color-kinpaku)' }} />
          </div>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--color-graphite-light)', lineHeight: 1.8 }}>
            对 AI Agent 工程、Skill 工程、Harness 编排感兴趣？欢迎交流，一起探索 AI 的工程化未来。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/siYuanJun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:scale-105"
              style={{ border: '1px solid var(--color-rule-strong)', color: 'var(--color-champagne)', borderRadius: '2px' }}
            >
              <GitBranch size={16} />
              GitHub
            </a>
            <a
              href="mailto:siyuanjunr@qq.com"
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:scale-105 glow-gold"
              style={{ background: 'var(--color-kinpaku)', color: 'var(--color-lacquer)', borderRadius: '2px' }}
            >
              <Mail size={16} />
              发送邮件
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--color-rule)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center" style={{ background: 'var(--color-kinpaku)', borderRadius: '2px' }}>
            <Brain size={14} style={{ color: 'var(--color-lacquer)' }} />
          </div>
          <span className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
            © 2026 Lujo · AI Agent 工程实践者
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/siYuanJun" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-kinpaku)]" style={{ color: 'var(--color-faint)' }}>
            <GitBranch size={16} />
          </a>
          <a href="mailto:siyuanjunr@qq.com" className="transition-colors hover:text-[var(--color-kinpaku)]" style={{ color: 'var(--color-faint)' }}>
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   主应用
   ============================================================ */
export default function App() {
  return (
    <div className="min-h-screen relative">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}
