import { Badge } from '@/components/atomic/atoms/Badge'
import { Button } from '@/components/atomic/atoms/Button'
import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Callout, ImageWithFallback } from '@/components/atomic/molecules'
import { IndustrialRevolutionTabs, IndustrializationModels, TechDisruptionExplainer } from '@/components/atomic/organisms'
import { IndexLayout } from '@/components/templates/IndexLayout'
import Link from 'next/link'

export default function HomePage() {
    return (
        <IndexLayout
            hero={{
                title: 'ĐỨT GÃY CÔNG NGHỆ',
                subtitle: 'Hệ quả của nó – Tác động như thế nào đến chúng ta?',
                description:
                    'Một góc nhìn kinh tế–chính trị Mác–Lênin về mâu thuẫn công nghệ trong thế kỷ 21: từ cuộc chiến chip, nền kinh tế nền tảng, đến chủ quyền dữ liệu và trừng phạt công nghệ.',
            }}
        >
            {/* Khái quát về Cách mạng Công nghiệp */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <Heading level={2}>Khái quát về các cuộc cách mạng công nghiệp và quá trình công nghiệp hóa</Heading>
                </div>

                {/* Lý thuyết */}
                <div className="card bg-surface-1 mb-8">
                    <Badge variant="primary" className="mb-3">Lý thuyết</Badge>
                    <Paragraph className="text-text-1">
                        Cách mạng công nghiệp là những bước phát triển nhảy vọt về chất trình độ của tư liệu lao động
                        trên cơ sở những phát triển của nhân loại kéo theo sự thay đổi căn bản về phân công lao động
                        xã hội cũng như tạo bước phát triển năng suất lao động cao hơn hẳn nhờ áp dụng một cách phổ
                        biến những tính năng mới trong kỹ thuật – công nghiệp đó vào đời sống xã hội.
                    </Paragraph>
                </div>

                {/* Infographic - 4 cuộc CMCN */}
                <IndustrialRevolutionTabs />

                {/* Vai trò của CMCN */}
                <div className="mt-12 mb-8">
                    <Heading level={3} className="mb-6">Vai trò của Cách mạng công nghiệp</Heading>
                    <Paragraph className="text-text-2 mb-8">
                        Cách mạng công nghiệp (CMCN) là động lực làm thay đổi căn bản diện mạo nền sản xuất xã hội qua ba phương diện:
                    </Paragraph>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 1. LLSX */}
                        <div className="card bg-surface-1 border-l-4 border-l-primary-500">
                            <div className="aspect-[16/10] bg-surface-2 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                {/* <ImageWithFallback
                                    src="/images/llsx.jpg"
                                    alt="Lực lượng sản xuất"
                                    fallbackIcon="⚙️"
                                    fallbackText="LLSX"
                                /> */}
                            </div>
                            <Badge variant="primary" className="mb-3">1. Lực lượng sản xuất</Badge>
                            <ul className="space-y-3 text-sm text-text-2">
                                <li className="flex gap-2">
                                    <span className="text-primary-400">•</span>
                                    <span><strong className="text-text-1">Tư liệu lao động:</strong> Chuyển từ máy móc cơ khí sang hệ thống thông minh (AI, Robot, IoT).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary-400">•</span>
                                    <span><strong className="text-text-1">Người lao động:</strong> Đòi hỏi sự chuyển dịch từ lao động cơ bắp sang lao động trí tuệ.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary-400">•</span>
                                    <span><strong className="text-text-1">Đối tượng lao động:</strong> Mở rộng từ tài nguyên thiên nhiên sang tài nguyên số và tri thức.</span>
                                </li>
                            </ul>
                        </div>

                        {/* 2. QHSX */}
                        <div className="card bg-surface-1 border-l-4 border-l-accent-500">
                            <div className="aspect-[16/10] bg-surface-2 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                {/* <ImageWithFallback
                                    src="/images/qhsx.jpg"
                                    alt="Quan hệ sản xuất"
                                    fallbackIcon="🤝"
                                    fallbackText="QHSX"
                                /> */}
                            </div>
                            <Badge variant="critical" className="mb-3">2. Quan hệ sản xuất</Badge>
                            <ul className="space-y-3 text-sm text-text-2">
                                <li className="flex gap-2">
                                    <span className="text-accent-400">•</span>
                                    <span><strong className="text-text-1">Quan hệ sở hữu:</strong> Xuất hiện các hình thức mới như sở hữu trí tuệ, sở hữu dữ liệu.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-accent-400">•</span>
                                    <span><strong className="text-text-1">Quan hệ tổ chức:</strong> Thúc đẩy phân công lao động quốc tế sâu sắc.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-accent-400">•</span>
                                    <span><strong className="text-text-1">Quan hệ phân phối:</strong> Ưu tiên phân phối theo trình độ tri thức và hiệu quả công nghệ.</span>
                                </li>
                            </ul>
                        </div>

                        {/* 3. Phương thức quản trị */}
                        <div className="card bg-surface-1 border-l-4 border-l-system-500">
                            <div className="aspect-[16/10] bg-surface-2 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                {/* <ImageWithFallback
                                    src="/images/quantri.jpg"
                                    alt="Phương thức quản trị"
                                    fallbackIcon="📊"
                                    fallbackText="Quản trị"
                                /> */}
                            </div>
                            <Badge variant="system" className="mb-3">3. Phương thức quản trị</Badge>
                            <ul className="space-y-3 text-sm text-text-2">
                                <li className="flex gap-2">
                                    <span className="text-system-400">•</span>
                                    <span><strong className="text-text-1">Quản trị dựa trên dữ liệu:</strong> Chuyển từ quản trị theo kinh nghiệm sang quản trị bằng dữ liệu thực (Big Data).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-system-400">•</span>
                                    <span><strong className="text-text-1">Cấu trúc linh hoạt:</strong> Thay thế mô hình phân cấp cứng nhắc bằng cấu trúc mạng lưới phẳng.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-system-400">•</span>
                                    <span><strong className="text-text-1">Quản trị số:</strong> Thúc đẩy hình thành Chính phủ số.</span>
                                </li>
                            </ul>
                        </div>
                    </div>


                </div>

                {/* Các mô hình công nghiệp hóa tiêu biểu trên thế giới */}
                <IndustrializationModels />

                {/* Trả lời cho câu hỏi đứt gãy công nghệ là gì */}
                <TechDisruptionExplainer />
                
                {/* Khung lý luận Mác-Lênin */}
                <Heading level={3} className="mb-6 mt-12">Khung lý luận Mác-Lênin</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Callout type="concept" title="Lực lượng sản xuất (LLSX)">
                        Bao gồm tư liệu sản xuất (công nghệ, máy móc, dữ liệu) và sức lao động.
                        Trong kỷ nguyên số, AI, cloud computing, semiconductor là LLSX then chốt.
                    </Callout>

                    <Callout type="concept" title="Quan hệ sản xuất (QHSX)">
                        Quan hệ sở hữu, phân phối, trao đổi. Ai sở hữu nền tảng? Ai kiểm soát dữ liệu?
                        Mâu thuẫn nảy sinh khi QHSX kìm hãm LLSX.
                    </Callout>

                    <Callout type="rupture" title="Đứt gãy / Mâu thuẫn">
                        Khi LLSX phát triển nhưng QHSX cũ (độc quyền, bảo hộ, trừng phạt) không theo kịp,
                        tạo ra khủng hoảng: chuỗi cung ứng đứt, nền tảng thống trị, phụ thuộc công nghệ.
                    </Callout>

                    <Callout type="regulation" title="Điều tiết / Nhà nước">
                        Vai trò nhà nước trong kiểm soát, điều tiết: luật chống độc quyền,
                        chính sách chip, chủ quyền dữ liệu, đầu tư R&D.
                    </Callout>
                </div>
            </section>

            {/* Features Grid */}
            <section className="mb-16">
                <Heading level={2} className="mb-6">Khám phá</Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Game Card */}
                    <Link href="/game" className="card card-hover group">
                        <Badge variant="rupture" className="mb-4">Interactive</Badge>
                        <h3 className="heading-4 mb-2 group-hover:text-primary-400 transition-colors">
                            🎮 Game & Trải nghiệm
                        </h3>
                        <Paragraph muted className="mb-4">
                            Học qua chơi — khám phá các khái niệm kinh tế-chính trị thông qua
                            game simulation và quiz tương tác.
                        </Paragraph>
                        <span className="text-primary-400 text-sm">Khám phá ngay →</span>
                    </Link>

                    {/* AI Usage Card */}
                    <Link href="/ai-usage" className="card card-hover group">
                        <Badge variant="system" className="mb-4">Transparency</Badge>
                        <h3 className="heading-4 mb-2 group-hover:text-primary-400 transition-colors">
                            🤖 AI Usage Policy
                        </h3>
                        <Paragraph muted className="mb-4">
                            Minh bạch về cách chúng tôi sử dụng AI trong việc xây dựng
                            và vận hành website này.
                        </Paragraph>
                        <span className="text-primary-400 text-sm">Tìm hiểu thêm →</span>
                    </Link>
                </div>
            </section>

            {/* Topics Preview */}
            <section className="mb-16">
                <Heading level={2} className="mb-6">Chủ đề nghiên cứu</Heading>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Chip War', badge: 'rupture' as const, icon: '💾' },
                        { label: 'Platform Economy', badge: 'critical' as const, icon: '🏢' },
                        { label: 'Data Sovereignty', badge: 'system' as const, icon: '🔐' },
                        { label: 'Tech Sanctions', badge: 'rupture' as const, icon: '⚡' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="card flex flex-col items-center justify-center py-8 text-center"
                        >
                            <span className="text-3xl mb-3">{item.icon}</span>
                            <Badge variant={item.badge} className="mb-2">
                                Topic
                            </Badge>
                            <span className="font-medium text-text-1 text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Manifesto */}
            <section className="card bg-surface-2 border-primary-600/30">
                <Heading level={3} className="mb-4">
                    Tuyên ngôn
                </Heading>
                <Paragraph className="mb-4">
                    Công nghệ không trung lập. Nó vừa là <strong>lực lượng sản xuất</strong> giải phóng
                    năng suất, vừa là <strong>công cụ quyền lực</strong> trong tay giai cấp thống trị.
                    Mâu thuẫn giữa sự phát triển của LLSX (AI, chip, cloud) và hạn chế của QHSX
                    (độc quyền, bảo hộ, phụ thuộc) tạo ra những <em>&quot;đứt gãy&quot;</em> có tính hệ thống.
                </Paragraph>
                <Paragraph muted className="mb-6">
                    Website này áp dụng khung lý luận kinh tế–chính trị Mác–Lênin để phân tích
                    các hiện tượng công nghệ đương đại.
                </Paragraph>
                <Link href="/about">
                    <Button variant="secondary">Tìm hiểu về chúng tôi</Button>
                </Link>
            </section>
        </IndexLayout>
    )
}
