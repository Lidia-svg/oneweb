import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import OperaDollAssistant from './OperaDollAssistant.jsx'
import './styles.css'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

const nav = [
  ['首页', '#cover'],
  ['发展历程', '#history'],
  ['艺术鉴赏', '#appreciation'],
  ['京剧流派', '#schools'],
  ['唱腔技巧', '#singing'],
  ['非遗名录', '#heritage'],
  ['京剧学习', '#learning'],
  ['用户中心', '#user-center'],
]

const searchItems = [
  { title: '京剧发展历程', detail: '徽班进京、京剧形成与成熟、鼎盛、改革创新与复兴保护', href: '#history', keywords: '历史 年份 徽班 形成 鼎盛 改革 复兴' },
  { title: '京剧流派', detail: '梅派、尚派、程派、荀派的艺术特色', href: '#schools', keywords: '流派 梅兰芳 尚小云 程砚秋 荀慧生 四大名旦' },
  { title: '京剧艺术鉴赏', detail: '欣赏京剧舞台、脸谱、服饰与表演图片', href: '#appreciation', keywords: '艺术 图片 脸谱 服装 服饰 舞台' },
  { title: '唱腔技巧', detail: '西皮、二黄、板式变化与唱念做打基础知识', href: '#singing', keywords: '唱腔 西皮 二黄 板式 发声 念白 唱念做打' },
  { title: '京剧传承人', detail: '王珮瑜、于魁智、李维康、谭元寿', href: '#heritage', keywords: '非遗 名录 传承人 王佩瑜 王珮瑜 于魁智 李维康 谭元寿' },
  { title: '京剧学习', detail: '从行当、身段、脸谱和经典剧目开始入门', href: '#learning', keywords: '学习 课程 入门 行当 身段 脸谱 剧目' },
  { title: '用户中心', detail: '查看演示学习进度、收藏与学习成就', href: '#user-center', keywords: '用户 进度 收藏 成就 个人中心' },
]

const heroSlides = [
  { image: assetUrl('assets/jingju-hero.png'), alt: '京剧演员手持金色花扇', headingTop: '传承', headingBottom: '千年艺术', subtitle: '感受京剧的魅力与精髓', position: 'center center' },
  { image: assetUrl('assets/hero/脸谱.png'), alt: '京剧脸谱艺术', headingTop: '多彩脸谱', headingBottom: '艺术', subtitle: '探索脸谱背后的文化内涵', position: 'center 46%' },
  { image: assetUrl('assets/hero/戏服.png'), alt: '华丽京剧戏服', headingTop: '华丽戏服', headingBottom: '展示', subtitle: '了解京剧服饰的制作工艺', position: 'center 48%' },
]

const eras = [
  { number: '01', date: '1790年', title: '徽班进京', image: assetUrl('assets/history/徽班进京.png'), text: '乾隆五十五年，三庆徽班进京献艺。此后徽班陆续入京，多种声腔在京城交汇，开启京剧孕育的序幕。' },
  { number: '02', date: '1790—1917年', title: '京剧形成与成熟', image: assetUrl('assets/history/京剧形成与成熟.png'), text: '徽调、汉调与昆曲、秦腔等彼此吸收，逐渐形成以西皮、二黄为代表的声腔体系；清末至民初，京剧艺术走向成熟。' },
  { number: '03', date: '1917—1937年前后', title: '京剧鼎盛时期', image: assetUrl('assets/history/京剧鼎盛时期.png'), text: '名家辈出、流派纷呈，演出与传播日益繁盛，京剧舞台呈现百花齐放的面貌。' },
  { number: '04', date: '20世纪50年代起', title: '京剧改革与创新', image: assetUrl('assets/history/京剧改革与创新.png'), text: '传统剧目整理与新编、现代题材创作并行，艺术家持续探索京剧如何呈现时代生活。' },
  { number: '05', date: '2006年至今', title: '复兴与保护', image: assetUrl('assets/history/复兴与保护.png'), text: '京剧列入国家级非遗名录，并于2010年列入联合国教科文组织人类非遗代表作名录；传承保护与当代表达继续同行。' },
]

const appreciationImages = Array.from({ length: 12 }, (_, index) => {
  const suffix = ['213456', '213509', '213533', '213548', '213556', '213613', '213702', '213718', '213730', '213742', '213845', '213854'][index]
  return { src: assetUrl(`assets/appreciation/Screenshot_2026_1017_${suffix}.png`), number: String(index + 1).padStart(2, '0') }
})

const schools = [
  { name: '梅派', person: '梅兰芳', image: assetUrl('assets/schools/梅派.png'), mark: '梅', style: 'school-plum', tag: '端庄典雅 · 圆润含蓄', desc: '以典雅大方的舞台风度与细腻传神的表演，展现旦角艺术的隽永之美。', detail: '梅派在唱腔、念白、身段和舞台造型上融会创新，形成雍容端庄、细腻传神的表演风格。人物塑造重视内心情感与舞台美感的统一，常见剧目有《贵妃醉酒》《霸王别姬》等。' },
  { name: '尚派', person: '尚小云', image: assetUrl('assets/schools/尚派.png'), mark: '尚', style: 'school-blue', tag: '刚健婀娜 · 明快爽朗', desc: '唱腔高亢明亮，身段矫健洒脱，塑造坚毅而有力量的舞台形象。', detail: '尚派以刚健挺拔的身段、明快爽朗的气质见长，唱做并重，善于塑造性格鲜明、坚韧果敢的女性形象。舞台表演富有力度，也兼具旦角的婀娜之美。' },
  { name: '程派', person: '程砚秋', image: assetUrl('assets/schools/程派.png'), stagePosition: 'center 14%', mark: '程', style: 'school-ink', tag: '深沉婉转 · 幽咽含蓄', desc: '以幽咽婉转的声腔和深沉细腻的情感表达，形成独特的艺术风格。', detail: '程派声腔委婉深沉，讲究气息运用与字音韵味，擅长表现人物复杂、含蓄的内心世界。表演细腻克制，常以层层递进的情绪变化打动观众。' },
  { name: '荀派', person: '荀慧生', image: assetUrl('assets/schools/荀派.png'), stagePosition: 'center 19%', mark: '荀', style: 'school-rose', tag: '俏丽灵动 · 清新自然', desc: '表演活泼灵动、富有生活气息，塑造娇俏而鲜活的人物形象。', detail: '荀派表演清新活泼、富有生活气息，擅长刻画聪慧俏丽、个性鲜活的人物。唱腔流畅灵巧，身段自然生动，常在传统程式中融入细致的人物观察。' },
]

const inheritors = [
  { name: '王珮瑜', image: assetUrl('assets/inheritors/王佩瑜.jpeg'), role: '余派女老生 · 京剧传播者', description: '人称“瑜老板”，上海京剧院国家一级演员，余派女老生，致力于京剧普及传播。图片为《赵氏孤儿》舞台演出扮相。' },
  { name: '于魁智', image: assetUrl('assets/inheritors/于魁智.jpeg'), role: '杨派老生 · 国家一级演员', description: '国家京剧院一级演员，杨派老生代表，文武兼备。图片为经典剧目《空城计》诸葛亮舞台照。' },
  { name: '李维康', image: assetUrl('assets/inheritors/李维康.jpeg'), role: '旦角表演艺术家', description: '国家级非遗京剧传承人，著名旦角表演艺术家，戏路宽广。图片为《白蛇传》舞台剧照。' },
  { name: '谭元寿', image: assetUrl('assets/inheritors/谭元寿.jpeg'), role: '谭派第五代传人 · 文武老生', description: '谭派第五代传人，出身七代梨园世家，曾饰演《沙家浜》郭建光。图片为传统戏舞台扮相。' },
]

const learningCards = [
  { number: '01', title: '认识京剧行当', category: '入门基础', description: '从生、旦、净、丑入手，了解人物类型、舞台造型与表演特点。', icon: '行', image: assetUrl('assets/learning/第一张.png') },
  { number: '02', title: '听懂西皮与二黄', category: '音乐唱腔', description: '认识京剧两类主要声腔，留意旋律、节奏和情绪表达的差异。', icon: '音', image: assetUrl('assets/learning/第二张.png') },
  { number: '03', title: '看懂脸谱与服饰', category: '舞台美学', description: '观察色彩、纹样和装扮如何帮助观众理解人物身份与性格。', icon: '彩', image: assetUrl('assets/learning/第三张.png') },
  { number: '04', title: '走近经典剧目', category: '剧目赏析', description: '从《空城计》《白蛇传》等熟悉剧目开始，体会程式与故事。', icon: '戏', image: assetUrl('assets/learning/第四张.png') },
]

function SectionHeading({ kicker, title, description, light = false }) {
  return <div className={`section-heading ${light ? 'heading-light' : ''}`}>
    <span className="heading-kicker"><i />{kicker}<i /></span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    <span className="heading-flourish" aria-hidden="true">✦</span>
  </div>
}

function App() {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState(0)
  const [schoolPaused, setSchoolPaused] = useState(false)
  const [heroSlide, setHeroSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [today, setToday] = useState(() => new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [savedLessons, setSavedLessons] = useState(['认识京剧行当', '看懂脸谱与服饰'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    const sections = nav.map(([, href]) => document.querySelector(href)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target)
          if (idx >= 0) setActive(idx)
        }
      })
    }, { rootMargin: '-30% 0px -55% 0px' })
    sections.forEach((section) => observer.observe(section))
    const revealCards = document.querySelectorAll('.era-card')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    revealCards.forEach((card) => revealObserver.observe(card))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); revealObserver.disconnect() }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 3000)
    return () => window.clearInterval(timer)
  }, [heroSlide])

  useEffect(() => {
    if (schoolPaused) return undefined
    const timer = window.setInterval(() => setSelectedSchool((current) => (current + 1) % schools.length), 4000)
    return () => window.clearInterval(timer)
  }, [schoolPaused])

  useEffect(() => {
    const timer = window.setInterval(() => setToday(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const changeSchool = (direction) => setSelectedSchool((current) => (current + direction + schools.length) % schools.length)
  const dateLabel = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' }).format(today)
  const weekdayLabel = new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(today)

  return <>
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <a className="brand" href="#cover" aria-label="回到封面"><span className="brand-seal">京</span><span>梨园雅集<small>CHINESE OPERA</small></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">☰</button>
      <nav className={menuOpen ? 'nav-open' : ''}>
        {nav.map(([label, href], index) => <a key={href} className={active === index ? 'nav-active' : ''} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <form className="site-search" role="search" onSubmit={(event) => { event.preventDefault(); const query = searchQuery.trim(); setSearchResults(query ? searchItems.filter((item) => `${item.title} ${item.detail} ${item.keywords}`.toLowerCase().includes(query.toLowerCase())) : []); }}>
        <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); if (!event.target.value) setSearchResults(null); }} onFocus={() => searchResults === null && setSearchResults([])} placeholder="搜索京剧内容" aria-label="搜索网站内容" />
        <button type="submit" aria-label="搜索">⌕</button>
        {searchResults !== null && <div className="search-results" role="status">
          {searchQuery.trim() && searchResults.length ? searchResults.map((item) => <a href={item.href} key={item.href} onClick={() => setSearchResults(null)}><strong>{item.title}</strong><span>{item.detail}</span></a>) : searchQuery.trim() ? <p>没有找到相关内容，试试“流派”“唱腔”或“传承人”。</p> : <p>可搜索：历史、流派、唱腔、传承人、学习</p>}
        </div>}
      </form>
    </header>

    <main>
      <section className="hero" id="cover">
        <div className="hero-photo" key={heroSlides[heroSlide].image}>
          <img src={heroSlides[heroSlide].image} alt={heroSlides[heroSlide].alt} style={{ objectPosition: heroSlides[heroSlide].position }} />
        </div>
        <div className="hero-shade" />
        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />
        <div className="hero-copy" key={`hero-copy-${heroSlide}`}>
          <p className="hero-overline"><span />梨园新赏 · 京剧文化<span /></p>
          <h1><span>{heroSlides[heroSlide].headingTop}</span><em>{heroSlides[heroSlide].headingBottom}</em></h1>
          <p className="hero-subtitle">{heroSlides[heroSlide].subtitle}</p>
          <a className="hero-cta" href="#history">循着戏韵，走近京剧 <span>↓</span></a>
        </div>
        <div className="hero-side-note">一腔一调 · 一招一式</div>
        <button className="hero-next" onClick={() => setHeroSlide((current) => (current + 1) % heroSlides.length)} aria-label="切换下一张封面">&gt;</button>
        <div className="hero-bottom"><span>BEAUTY OF PEKING OPERA</span><a href="#history">向下探索　⌄</a><span>0{heroSlide + 1} — 0{heroSlides.length}</span></div>
      </section>

      <section id="history" className="history-section section-wrap">
        <SectionHeading kicker="A THOUSAND YEARS OF ART" title="京剧发展历程" description="从徽班进京到薪火相传，循着五个重要阶段，感受京剧艺术的生长与新生。" />
        <div className="timeline">
          <div className="timeline-spine" />
          {eras.map((era, index) => <article className={`era-card era-${index + 1}`} key={era.number}>
            <span className="era-dot" />
            <div className="era-image"><img src={era.image} alt={`${era.title}主题图片`} loading="lazy" /></div>
            <div className="era-content"><div className="era-meta"><span className="era-index">{era.number}</span><span className="era-date">{era.date}</span></div>
              <h3>{era.title}</h3>
              <p className="era-text">{era.text}</p>
            </div>
          </article>)}
        </div>
        <div className="history-caption"><span>梨园薪火　代代相传</span><i /><small>史料参考：<a href="https://www.pgm.org.cn/pgm/xsyjou/200905/dd9f9f5bb2d04f4bb265f61a9eb14208.shtml" target="_blank" rel="noreferrer">故宫博物院</a> · <a href="https://www.neac.gov.cn/seac/c103391/202309/1167991.shtml" target="_blank" rel="noreferrer">国家民委</a> · <a href="https://ich.nlc.cn/unesco/detail/21" target="_blank" rel="noreferrer">国家图书馆</a></small></div>
      </section>

      <section id="appreciation" className="appreciation-section section-wrap">
        <SectionHeading kicker="THE ART OF OPERA" title="京剧艺术欣赏" description="一方戏台，生旦净丑各有风采；一曲唱腔，唱尽悲欢离合。" light />
        <div className="appreciation-marquee" aria-label="京剧艺术图片轮播，从右向左自动播放；鼠标悬停可暂停">
          <div className="marquee-track">
            {[...appreciationImages, ...appreciationImages].map((image, index) => <figure className={`artwork-card ${selectedArtwork === image.number && index < appreciationImages.length ? 'artwork-card-selected' : ''}`} key={`${image.number}-${index}`} aria-hidden={index >= appreciationImages.length} aria-pressed={index < appreciationImages.length ? selectedArtwork === image.number : undefined} tabIndex={index < appreciationImages.length ? 0 : -1} onClick={() => index < appreciationImages.length && setSelectedArtwork((current) => current === image.number ? null : image.number)} onKeyDown={(event) => { if (index < appreciationImages.length && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setSelectedArtwork((current) => current === image.number ? null : image.number) } }}>
              <img src={image.src} alt={index < appreciationImages.length ? `京剧艺术欣赏图片 ${image.number}` : ''} loading={index < 6 ? 'eager' : 'lazy'} />
              <figcaption><span>京剧艺术 · {image.number}</span><i>✦</i></figcaption>
            </figure>)}
          </div>
        </div>
        <div className="appreciation-foot"><span>唱 · 念 · 做 · 打</span><span>一招一式皆是功，一腔一调总关情</span><span className="marquee-hint">悬停图片即可暂停欣赏</span></div>
      </section>

      <section id="schools" className="schools-section section-wrap">
        <SectionHeading kicker="ARTISTIC SCHOOLS" title="京剧流派艺术卡片" description="名家各有风骨，流派自成风华。点选卡片，看看不同的舞台气韵。" />
        <div className="school-stage" onMouseEnter={() => setSchoolPaused(true)} onMouseLeave={() => setSchoolPaused(false)}>
          <img key={`stage-bg-${selectedSchool}`} className="school-stage-background" src={schools[selectedSchool].image} style={{ objectPosition: schools[selectedSchool].stagePosition || 'center 48%' }} alt="" aria-hidden="true" />
          <div className="school-stage-ornament" aria-hidden="true">梨园<br />流芳</div>
          <div className="school-copy">
            <p className="school-eyebrow">FOUR GREAT DAN ROLES · 四大名旦</p>
            <div className="school-title-row"><h3>{schools[selectedSchool].name}</h3><span>{schools[selectedSchool].person}</span></div>
            <p className="school-tag">{schools[selectedSchool].tag}</p>
            <p className="school-description">{schools[selectedSchool].desc}</p>
            <div className="school-detail"><span>流派赏析 / INSIGHT</span><p>{schools[selectedSchool].detail}</p></div>
            <div className="school-controls">
              <button onClick={() => changeSchool(-1)} aria-label="上一个流派">←</button>
              <div className="school-dots">{schools.map((school, i) => <button key={school.name} className={selectedSchool === i ? 'dot-active' : ''} onClick={() => setSelectedSchool(i)} aria-label={`查看${school.name}`} />)}</div>
              <span>0{selectedSchool + 1} <i>/</i> 04</span>
              <button onClick={() => changeSchool(1)} aria-label="下一个流派">→</button>
            </div>
          </div>
          <div className="school-deck" aria-live="polite">
            {schools.map((school, index) => {
              const distance = (index - selectedSchool + schools.length) % schools.length
              const offset = distance === 0 ? 0 : distance === 1 ? -1 : distance === 2 ? 2 : 1
              return <button key={school.name} onClick={() => setSelectedSchool(index)} className={`school-card ${school.style} ${distance === 0 ? 'school-card-active' : ''}`} style={{ '--offset': offset, '--layer': distance }} aria-label={`查看${school.name}：${school.person}`}>
                <img className="school-card-photo" src={school.image} alt={school.person} loading="lazy" />
                <span className="card-number">0{index + 1} / FOUR SCHOOLS</span>
                <span className="card-emboss" aria-hidden="true">{school.mark}</span>
                <span className="card-seal">梨园<br />雅集</span>
                <span className="card-name">{school.name}<small>{school.person}</small></span>
                <span className="card-bottom-line"><i /> {school.tag.split(' · ')[0]}</span>
              </button>
            })}
          </div>
        </div>
        <p className="school-hint">可点选右侧流派卡片，或使用箭头切换</p>
      </section>

      <section id="singing" className="singing-section section-wrap">
        <SectionHeading kicker="VOICE & RHYTHM" title="唱腔技巧入门" description="从声腔、板式与表演程式开始，听见京剧音乐的起伏与人物情感。" light />
        <div className="singing-intro"><span className="singing-stamp">声</span><p>京剧唱腔以<strong>西皮</strong>、<strong>二黄</strong>为主要声腔，并通过不同板式的节奏变化表现情境。唱、念、做、打相互配合，共同塑造舞台人物。</p><small>内容参考：中国非物质文化遗产网《京剧》项目介绍</small></div>
        <div className="singing-grid">
          <article className="singing-card"><span>01 / 声腔</span><h3>西皮</h3><p>旋律通常较为明亮、活跃，常用于表现爽朗、激越或富有行动感的情绪。欣赏时可以留意节奏的推进与人物情绪的外显。</p><b>明快 · 流动 · 富于变化</b></article>
          <article className="singing-card"><span>02 / 声腔</span><h3>二黄</h3><p>旋律气质常显沉稳、深情，适合表现内心思索、抒情或庄重的情境。聆听时可关注行腔的舒展和情绪层次。</p><b>沉稳 · 深情 · 从容舒展</b></article>
          <article className="singing-card"><span>03 / 方法</span><h3>板式变化</h3><p>同一声腔可通过板式、速度和节奏的变化适应不同戏剧情境。初学欣赏时，可先听节奏快慢，再体会人物情感如何转折。</p><b>节奏 · 速度 · 戏剧情绪</b></article>
          <article className="singing-card"><span>04 / 表演</span><h3>唱念做打</h3><p>唱腔与念白、身段、武技彼此呼应。看戏时不妨同时观察演员的眼神、手势、步法和锣鼓节奏。</p><b>听唱腔 · 看身段 · 识程式</b></article>
        </div>
        <p className="source-note">资料来源：<a href="https://www.ihchina.cn/project_details/13206.html" target="_blank" rel="noreferrer">中国非物质文化遗产网·京剧项目介绍</a></p>
      </section>

      <section id="heritage" className="heritage-section section-wrap">
        <SectionHeading kicker="LIVING HERITAGE" title="梨园薪火 · 代表人物" description="走近不同流派与舞台风格的京剧艺术家，感受一代代传承者的坚守与创造。" />
        <div className="inheritor-grid">{inheritors.map((person, index) => <article className="inheritor-card" key={person.name}>
          <div className="inheritor-photo"><img src={person.image} alt={`${person.name}京剧舞台照片`} loading="lazy" /><span>梨园人物　/　0{index + 1}</span></div>
          <div className="inheritor-info"><p>{person.role}</p><h3>{person.name}</h3><div className="inheritor-rule" /><p className="inheritor-description">{person.description}</p></div>
        </article>)}</div>
        <p className="source-note">致敬梨园名家，记录京剧艺术的时代风华。</p>
      </section>

      <section id="learning" className="learning-section section-wrap">
        <SectionHeading kicker="LEARN THE OPERA" title="京剧学习 · 从这里开始" description="循序认识京剧的行当、声腔、舞台美学与经典剧目，先学会看，再慢慢听懂。" light />
        <div className="learning-banner"><div><span>梨园入门指南 / BEGINNER'S GUIDE</span><h3>四步走近京剧</h3><p>从看角色、听唱腔、识装扮到读剧目，开启一段轻松的赏戏旅程。</p></div><div className="learning-seal">学<br />戏</div></div>
        <div className="learning-grid">{learningCards.map((lesson) => <article className="lesson-card" key={lesson.number}>
          <span className="lesson-number">{lesson.number} <i>/ LEARNING</i></span><div className="lesson-photo"><img src={lesson.image} alt={`${lesson.title}学习图片`} loading="lazy" /><span>{lesson.icon}</span></div><p>{lesson.category}</p><h3>{lesson.title}</h3><p className="lesson-description">{lesson.description}</p>
          <button className={savedLessons.includes(lesson.title) ? 'lesson-saved' : ''} onClick={() => setSavedLessons((current) => current.includes(lesson.title) ? current.filter((item) => item !== lesson.title) : [...current, lesson.title])}>{savedLessons.includes(lesson.title) ? '已加入学习清单 ✓' : '加入学习清单　＋'}</button>
        </article>)}</div>
        <div className="learning-sources"><strong>延伸学习资料</strong><a href="https://www.chncpa.org/yshd/ysjy_7420/xyysk/" target="_blank" rel="noreferrer">国家大剧院 · 校园艺术课</a><a href="https://www.ihchina.cn/project_details/22261" target="_blank" rel="noreferrer">中国非物质文化遗产网 · 京剧项目</a></div>
      </section>

      <section id="user-center" className="user-center-section section-wrap">
        <SectionHeading kicker="YOUR OPERA NOTEBOOK" title="我的梨园 · 学习中心" description="赏皮黄雅韵，品国粹风华，让京剧走进日常，让经典生生不息。" />
        <div className="dashboard-date"><span>梨园日历 · TODAY</span><strong>{dateLabel}</strong><i>{weekdayLabel}</i><em>梨园雅集</em></div>
        <div className="dashboard-layout"><aside className="dashboard-profile"><div className="profile-seal">梨</div><span>梨园新知者</span><small>欢迎来到你的京剧学习空间</small><div className="profile-line" /><p>本次体验学习进度</p><div className="progress-track"><i style={{ width: `${Math.round(savedLessons.length / learningCards.length * 100)}%` }} /></div><strong>{Math.round(savedLessons.length / learningCards.length * 100)}%</strong></aside>
          <div className="dashboard-main"><div className="dashboard-stats"><article><span>学习清单</span><strong>{savedLessons.length}<small> / {learningCards.length}</small></strong></article><article><span>探索栏目</span><strong>08<small> 个</small></strong></article><article><span>今日寄语</span><strong className="stat-quote">赏皮黄雅韵<br />品国粹风华</strong></article></div><div className="saved-list"><div><h3>我的学习清单</h3><p>点击课程卡片可添加或移除</p></div>{savedLessons.length ? savedLessons.map((lesson) => <span key={lesson}>✦　{lesson}</span>) : <span className="empty-list">还没有加入内容，去“京剧学习”挑选一项吧。</span>}</div></div></div>
      </section>

      <footer id="contact" className="contact-section">
        <div className="contact-main">
          <div className="contact-title"><span>THE END / A NEW BEGINNING</span><h2>让戏韵<br /><em>继续流传</em></h2><p>感谢驻足，共赏京剧之美。</p><a href="mailto:3078449226@qq.com" className="contact-cta">与我们联系 <span>↗</span></a></div>
          <div className="contact-watermark" aria-hidden="true">京</div>
        </div>
        <div className="footer-columns">
          <div className="footer-about"><div className="footer-heading"><h3>关于梨园雅集</h3><i className="footer-underline" /></div><p>以一方网页作戏台，邀你走近京剧艺术，感受传统文化的悠长韵味。</p></div>
          <div className="footer-links"><div className="footer-heading"><h3>快速链接</h3><i className="footer-underline" /></div><div className="footer-link-list">{nav.slice(1).map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div></div>
          <div className="footer-contact"><div className="footer-heading"><h3>联系我们</h3><i className="footer-underline" /></div><a href="mailto:3078449226@qq.com"><span className="contact-label"><i>邮箱</i><b>：</b></span><span className="contact-value">3078449226@qq.com</span></a><a href="https://wpa.qq.com/msgrd?v=3&uin=3078449226&site=qq&menu=yes" target="_blank" rel="noreferrer"><span className="contact-label"><i>QQ</i><b>：</b></span><span className="contact-value">3078449226</span></a></div>
          <div className="footer-note"><div className="footer-heading"><h3>梨园寄语</h3><i className="footer-underline" /></div><p>台上三分钟，台下数十年。<br />敬一份热爱，传一脉戏韵。</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 梨园雅集 · 京剧文化展示</span><span>一腔一调　薪火相传</span><a href="#cover">回到顶部 ↑</a></div>
      </footer>
    </main>
    <OperaDollAssistant />
  </>
}

createRoot(document.getElementById('root')).render(<App />)
