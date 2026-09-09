import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Brain, GitBranch, Zap, Code2, Terminal, Cpu, Database,
  Mail, ArrowRight, ExternalLink, Layers, Workflow, ChevronDown,
  Activity, CircuitBoard
} from 'lucide-react'

/* ============================================================
   数据
   ============================================================ */
const PROJECTS = [
  {
    name: 'CortexLab',
    desc: '数字员工大脑架构实验室 — 3D 人体隐喻可视化 AgentTeams SDK 架构、大脑适配流程与多宿主接入',
    tags: ['React', 'Three.js', 'React Flow'],
    url: 'https://github.com/siYuanJun/cortexlab',
    color: '#00e5ff',
    icon: Brain,
    featured: true,
  },
  {
    name: 'Harness Team System',
    desc: 'AI 多 Agent 团队体系：团队搭建方法论 + 搭团队元工具 + 派任务元工具 + 垂直团队实例',
    tags: ['Claude Code', 'Agent Teams', 'Methodology'],
    url: 'https://github.com/siYuanJun/harness-team-system',
    color: '#ff2d95',
    icon: Workflow,
    featured: true,
  },
  {
    name: 'Skill Flow Viz',
    desc: 'Skill 工程可视化：把 SKILL.md 的执行脉络翻译为流程图 + 时间轴 + 信息卡，几秒掌握每个 Skill 怎么跑',
    tags: ['Visualization', 'Skill Engineering'],
    url: 'https://github.com/siYuanJun/skill-flow-viz',
    color: '#a855f7',
    icon: Layers,
  },
  {
    name: 'Ontology Brain Visual',
    desc: '本体工程师数字员工展示层：Harness 团队 + Skill 工程的对外可视化（Dashboard / KPI / 时间轴）',
    tags: ['Dashboard', 'Digital Employee'],
    url: 'https://github.com/siYuanJun/ontology-brain-visual',
    color: '#00e5ff',
    icon: Cpu,
  },
  {
    name: 'Interview Tiger',
    desc: '本地化 AI 面试辅助工具：实时录制面试官语音，AI 生成贴合你个人背景的回答建议',
    tags: ['AI Tool', 'Local-first', 'Audio'],
    url: 'https://github.com/siYuanJun/interview-tiger',
    color: '#ff2d95',
    icon: Zap,
  },
  {
    name: 'Showcase',
    desc: '工程作品集：业务工程 ×4 + 方法论工程 ×5 的统一可视化索引（纯静态 HTML，在线浏览）',
    tags: ['Portfolio', 'Static HTML'],
    url: 'https://siyuanjun.github.io/showcase/',
    color: '#a855f7',
    icon: Activity,
  },
]

const SKILLS = [
  { name: 'AI Agent', icon: Brain, level: '精通' },
  { name: 'Skill 工程', icon: Layers, level: '精通' },
  { name: 'Harness 编排', icon: Workflow, level: '精通' },
  { name: 'Claude Code', icon: Terminal, level: '精通' },
  { name: 'Python', icon: Code2, level: '精通' },
  { name: 'TypeScript', icon: Code2, level: '精通' },
  { name: 'React', icon: Cpu, level: '精通' },
  { name: 'FastAPI', icon: Zap, level: '精通' },
  { name: 'LLM / RAG', icon: Database, level: '精通' },
  { name: 'Three.js', icon: Activity, level: '精通' },
  { name: 'Vue', icon: Cpu, level: '精通' },
  { name: 'Git', icon: GitBranch, level: '精通' },
]

const DIRECTIONS = [
  {
    icon: Layers,
    title: 'Skill 工程',
    desc: '将方法论与工作流蒸馏为可复用的 Agent Skills，让经验可沉淀、可调度、可传承',
    color: '#00e5ff',
  },
  {
    icon: Workflow,
    title: 'Harness 编排',
    desc: '为任意项目构建可被 Claude Code 调度的多 Agent 团队，让 AI 从单次对话变为工程化生产力',
    color: '#ff2d95',
  },
  {
    icon: Zap,
    title: 'AI 应用落地',
    desc: '面向真实场景的 AI 工具与产品，从面试辅助到数字员工，让 AI 真正解决实际问题',
    color: '#a855f7',
  },
]

/* ============================================================
   导航栏
   ============================================================ */
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
        background: scrolled ? 'rgba(5, 5, 8, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 229, 255, 0.2)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center neon-pulse"
            style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid #00e5ff' }}
          >
            <CircuitBoard size={20} style={{ color: '#00e5ff' }} />
          </div>
          <span
            className="text-lg font-bold tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-display)', color: '#00e5ff' }}
          >
            LUJO
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['关于', '项目', '技能', '联系'].map((item, i) => (
            <a
              key={i}
              href={`#${['about', 'projects', 'skills', 'contact'][i]}`}
              className="text-xs tracking-[0.15em] uppercase transition-colors hover:text-[#00e5ff]"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://github.com/siYuanJun"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-btn-secondary !py-2 !px-5 !text-xs"
          >
            <GitBranch size={14} />
            GitHub
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

/* ============================================================
   Hero 区
   ============================================================ */
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(0, 229, 255, 0.12)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(255, 45, 149, 0.1)' }} />
      </motion.div>

      {/* 数据流动画背景 */}
      <div className="absolute inset-0 data-flow-bg opacity-50" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <span className="cyber-tag">
            <Activity size={12} className="mr-2" />
            SYSTEM ONLINE · AI AGENT ENGINEER
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.2] tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          <span className="neon-text-cyan">CODE</span> IS JUST
          <br />
          THE <span className="neon-gradient">BEGINNING</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-4"
        >
          <p
            className="text-xl md:text-2xl font-light tracking-wide"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}
          >
            热爱不止于代码 · 全心投入 AI 探索之旅
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}
        >
          <span style={{ color: '#00e5ff' }}>{'>'}</span> 专注 Skill 工程与 Harness 编排
          <br />
          <span style={{ color: '#ff2d95' }}>{'>'}</span> 把 AI 从「单次对话助手」推进为「可编排、可治理、可复用」的工程化生产力
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <a href="#projects" className="cyber-btn-primary">
            查看精选项目
            <ArrowRight size={16} />
          </a>
          <a
            href="https://github.com/siYuanJun"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-btn-secondary"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={28} style={{ color: '#00e5ff' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ============================================================
   核心方向
   ============================================================ */
function About() {
  return (
    <section id="about" className="py-28 px-6" style={{ background: 'var(--color-bg-deep)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px" style={{ background: '#00e5ff' }} />
            <h2 className="section-title text-2xl md:text-3xl" style={{ color: 'var(--color-text)' }}>
              核心方向
            </h2>
            <div className="w-12 h-px" style={{ background: '#ff2d95' }} />
          </div>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>
            // 三个方向，一条主线——让 AI 真正工程化、可复用、可治理
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {DIRECTIONS.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="cyber-panel cyber-corner p-10 relative overflow-hidden group"
            >
              {/* 顶部霓虹线 */}
              <div
                className="absolute top-0 left-0 w-full h-0.5 transition-all duration-300"
                style={{ background: d.color, boxShadow: `0 0 10px ${d.color}` }}
              />

              <div
                className="w-14 h-14 flex items-center justify-center mb-7"
                style={{ background: `${d.color}10`, border: `1px solid ${d.color}40` }}
              >
                <d.icon size={28} style={{ color: d.color }} />
              </div>

              <h3
                className="text-xl font-bold mb-4 tracking-wide"
                style={{ fontFamily: 'var(--font-display)', color: d.color }}
              >
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)', lineHeight: '1.9' }}>
                {d.desc}
              </p>

              {/* 底部装饰 */}
              <div className="mt-8 flex items-center gap-2">
                <div className="w-2 h-2" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                <div className="w-8 h-px" style={{ background: `${d.color}60` }} />
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: d.color, fontFamily: 'var(--font-mono)' }}>
                  Module_{String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   精选项目
   ============================================================ */
function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px" style={{ background: '#00e5ff' }} />
            <h2 className="section-title text-2xl md:text-3xl" style={{ color: 'var(--color-text)' }}>
              精选项目
            </h2>
            <div className="w-12 h-px" style={{ background: '#ff2d95' }} />
          </div>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>
            // 从方法论到工具，从数字员工到个人辅助
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="cyber-panel p-8 relative overflow-hidden group block"
            >
              {p.featured && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="cyber-tag cyber-tag-magenta !text-[10px] !px-2.5 !py-1">
                    FEATURED
                  </span>
                </div>
              )}

              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}10`, border: `1px solid ${p.color}40` }}
                >
                  <p.icon size={24} style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0 pr-12">
                  <h3
                    className="text-lg font-bold mb-3 flex items-center gap-2 tracking-wide"
                    style={{ fontFamily: 'var(--font-display)', color: p.color }}
                  >
                    {p.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                    {p.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {p.tags.map((tag, j) => (
                  <span key={j} className="cyber-tag !text-[10px] !px-2.5 !py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 底部霓虹线 */}
              <div
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ background: p.color, boxShadow: `0 0 10px ${p.color}`, width: p.featured ? '100%' : '0%' }}
              />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/siYuanJun?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#00e5ff]"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            // 查看全部仓库
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   技术栈
   ============================================================ */
function Skills() {
  return (
    <section id="skills" className="py-28 px-6" style={{ background: 'var(--color-bg-deep)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px" style={{ background: '#00e5ff' }} />
            <h2 className="section-title text-2xl md:text-3xl" style={{ color: 'var(--color-text)' }}>
              技术栈
            </h2>
            <div className="w-12 h-px" style={{ background: '#ff2d95' }} />
          </div>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>
            // 从 AI Agent 工程到全栈开发，工具服务于目标
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SKILLS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              className="cyber-panel p-6 flex items-center gap-4 group"
            >
              <s.icon size={24} style={{ color: '#00e5ff', flexShrink: 0 }} className="group-hover:neon-text-cyan transition-all" />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>{s.name}</div>
                <div className="text-[10px] mt-1 tracking-[0.15em] uppercase" style={{ color: '#00e5ff', fontFamily: 'var(--font-mono)' }}>
                  {s.level}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   联系方式
   ============================================================ */
function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ background: '#00e5ff' }} />
            <h2 className="section-title text-2xl md:text-3xl" style={{ color: 'var(--color-text)' }}>
              保持联系
            </h2>
            <div className="w-12 h-px" style={{ background: '#ff2d95' }} />
          </div>

          <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            对 AI Agent 工程、Skill 工程、Harness 编排感兴趣？
            <br />
            <span style={{ color: '#00e5ff', fontFamily: 'var(--font-mono)' }}>{'>'}</span> 欢迎交流，一起探索 AI 的工程化未来
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://github.com/siYuanJun"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn-secondary"
            >
              <GitBranch size={18} />
              GitHub
            </a>
            <a href="mailto:siyuanjunr@qq.com" className="cyber-btn-primary">
              <Mail size={18} />
              发送邮件
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="py-10 px-6" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-deep)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center" style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid #00e5ff40' }}>
            <CircuitBoard size={14} style={{ color: '#00e5ff' }} />
          </div>
          <span className="text-xs tracking-[0.15em]" style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>
            © 2026 LUJO · AI AGENT ENGINEER
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/siYuanJun" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#00e5ff]" style={{ color: 'var(--color-text-faint)' }}>
            <GitBranch size={18} />
          </a>
          <a href="mailto:siyuanjunr@qq.com" className="transition-colors hover:text-[#00e5ff]" style={{ color: 'var(--color-text-faint)' }}>
            <Mail size={18} />
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
    <div className="min-h-screen relative scanlines">
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
