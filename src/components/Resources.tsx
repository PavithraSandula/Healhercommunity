import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, ExternalLink, Phone, MessageCircle, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ResourcesProps {
  onBack: () => void;
}

const articles = [
  {
    id: 1,
    title: 'Understanding PCOS: A Beginner\'s Guide',
    category: 'Health',
    summary: 'Learn about Polycystic Ovary Syndrome, its symptoms, and management strategies.',
    readTime: '5 min read',
    color: 'from-pink-400 to-rose-400'
  },
  {
    id: 2,
    title: 'Managing Stress and Anxiety in College',
    category: 'Mental Health',
    summary: 'Practical tips for handling academic pressure and maintaining mental wellness.',
    readTime: '7 min read',
    color: 'from-purple-400 to-indigo-400'
  },
  {
    id: 3,
    title: 'The Power of Self-Care Routines',
    category: 'Wellness',
    summary: 'Discover how daily self-care practices can transform your mental and physical health.',
    readTime: '6 min read',
    color: 'from-teal-400 to-cyan-400'
  },
  {
    id: 4,
    title: 'Nutrition for Hormonal Balance',
    category: 'Diet',
    summary: 'Foods that support hormonal health and help manage PCOS symptoms naturally.',
    readTime: '8 min read',
    color: 'from-green-400 to-emerald-400'
  },
  {
    id: 5,
    title: 'Breaking the Stigma: Talking About Mental Health',
    category: 'Awareness',
    summary: 'Why it\'s important to speak up and how to start conversations about mental wellness.',
    readTime: '5 min read',
    color: 'from-violet-400 to-purple-400'
  },
  {
    id: 6,
    title: 'Exercise and PCOS: What You Need to Know',
    category: 'Fitness',
    summary: 'The best types of exercise for managing PCOS and improving overall health.',
    readTime: '6 min read',
    color: 'from-orange-400 to-amber-400'
  }
];

const helplines = [
  {
    name: 'National Mental Health Helpline',
    number: '1-800-273-8255',
    description: '24/7 crisis support and mental health resources',
    available: '24/7',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    name: 'Women\'s Health Helpline',
    number: '1-800-994-9662',
    description: 'Information about women\'s health issues including PCOS',
    available: 'Mon-Fri, 9am-6pm',
    color: 'bg-pink-50 border-pink-200'
  },
  {
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'Free, 24/7 support for those in crisis',
    available: '24/7',
    color: 'bg-teal-50 border-teal-200'
  },
  {
    name: 'Student Support Services',
    number: '1-800-123-4567',
    description: 'Academic and personal counseling for students',
    available: 'Mon-Fri, 8am-8pm',
    color: 'bg-indigo-50 border-indigo-200'
  }
];

const communityTopics = [
  {
    id: 1,
    title: 'My PCOS journey and what helped me',
    author: 'Sarah M.',
    replies: 24,
    likes: 56,
    category: 'PCOS Support'
  },
  {
    id: 2,
    title: 'Dealing with exam stress - tips that worked',
    author: 'Priya K.',
    replies: 18,
    likes: 42,
    category: 'Student Life'
  },
  {
    id: 3,
    title: 'Healthy recipes for busy college students',
    author: 'Emily R.',
    replies: 31,
    likes: 78,
    category: 'Nutrition'
  },
  {
    id: 4,
    title: 'Finding the courage to seek help',
    author: 'Anonymous',
    replies: 15,
    likes: 89,
    category: 'Mental Health'
  }
];

export function Resources({ onBack }: ResourcesProps) {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <h1 className="mb-2">Resources & Support</h1>
          <p className="text-gray-600">Knowledge, help, and community when you need it</p>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 p-1 rounded-xl max-w-md mx-auto">
            <TabsTrigger value="articles" className="rounded-lg">📚 Articles</TabsTrigger>
            <TabsTrigger value="helplines" className="rounded-lg">📞 Helplines</TabsTrigger>
            <TabsTrigger value="community" className="rounded-lg">💬 Community</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <Card
                  key={article.id}
                  className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                  onClick={() => setSelectedArticle(article.id)}
                >
                  <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${article.color} mb-4`} />
                  <div className="text-xs text-purple-600 mb-2">{article.category}</div>
                  <h3 className="mb-3">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                    <ExternalLink className="w-4 h-4 text-purple-500" />
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-8 rounded-2xl border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 text-center">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="mb-2">Want More Resources?</h3>
              <p className="text-gray-600 mb-4">
                We're constantly adding new articles and guides to help you on your wellness journey.
              </p>
              <Button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Subscribe to Updates
              </Button>
            </Card>
          </TabsContent>

          {/* Helplines Tab */}
          <TabsContent value="helplines">
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="p-6 rounded-2xl border-red-200 bg-red-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-red-900">If you're in crisis</h3>
                    <p className="text-sm text-red-800 mb-3">
                      If you're thinking about harming yourself or others, please reach out immediately. You're not alone, and help is available 24/7.
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Emergency Services
                    </Button>
                  </div>
                </div>
              </Card>

              {helplines.map((helpline, index) => (
                <Card
                  key={index}
                  className={`p-6 rounded-2xl ${helpline.color} backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="mb-1">{helpline.name}</h3>
                      <p className="text-sm text-gray-600">{helpline.description}</p>
                    </div>
                    <div className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">
                      {helpline.available}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {helpline.number}
                    </Button>
                  </div>
                </Card>
              ))}

              <Card className="p-8 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm text-center">
                <div className="text-4xl mb-3">💜</div>
                <h3 className="mb-2">You Are Not Alone</h3>
                <p className="text-gray-600">
                  Reaching out for help is a sign of strength, not weakness. These services are here to support you, and so are we.
                </p>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 rounded-2xl border-purple-100 bg-gradient-to-br from-purple-100 via-pink-100 to-teal-100 mb-6">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="mb-1">Safe Community Space</h3>
                    <p className="text-sm text-gray-700">
                      Connect with others who understand. Share experiences, get support, and build connections.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                {communityTopics.map(topic => (
                  <Card
                    key={topic.id}
                    className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-xs text-purple-600 mb-2">{topic.category}</div>
                        <h3 className="mb-2">{topic.title}</h3>
                        <p className="text-sm text-gray-600">Posted by {topic.author}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {topic.replies} replies
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {topic.likes} likes
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="mt-6 p-8 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="mb-2">Community Guidelines</h3>
                <p className="text-gray-600 mb-4">
                  Our community is moderated to ensure a safe, supportive space for everyone. Be kind, respectful, and supportive.
                </p>
                <Button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Join the Community
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
