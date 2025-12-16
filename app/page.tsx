import { Badge } from '@/components/atomic/atoms/Badge'
import { Button } from '@/components/atomic/atoms/Button'
import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Callout, ImageWithFallback } from '@/components/atomic/molecules'
import { IndustrialRevolutionTabs, IndustrializationModels, TechDisruptionExplainer, VietnamTechArticles } from '@/components/atomic/organisms'
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
                                <ImageWithFallback
                                    src="/images/h1.jpg"
                                    alt="Lực lượng sản xuất"
                                    fallbackIcon="⚙️"
                                    fallbackText="LLSX"
                                />
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
                                <ImageWithFallback
                                    src="/images/h2.jpg"
                                    alt="Quan hệ sản xuất"
                                    fallbackIcon="🤝"
                                    fallbackText="QHSX"
                                />
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
                                <ImageWithFallback
                                    src="/images/h3.jpg"
                                    alt="Phương thức quản trị"
                                    fallbackIcon="📊"
                                    fallbackText="Quản trị"
                                />
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

                {/*Đứt gãy công nghệ và cách mạng công nghiệp tại Việt Nam */}
                <VietnamTechArticles />

               
            </section>

            {/* Features Grid */}
           
        </IndexLayout>
    )
}
