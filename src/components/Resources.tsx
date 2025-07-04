
import { Phone, Globe, MessageCircle, Heart, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Resource {
  id: string;
  name: string;
  description: string;
  contact: string;
  type: 'phone' | 'website' | 'text';
  category: string;
  icon: any;
  available: string;
}

const Resources = () => {
  const resources: Resource[] = [
    {
      id: '1',
      name: 'National Suicide Prevention Lifeline',
      description: '24/7 free and confidential support for people in distress',
      contact: '988',
      type: 'phone',
      category: 'Crisis Support',
      icon: Phone,
      available: '24/7'
    },
    {
      id: '2',
      name: 'Crisis Text Line',
      description: 'Free, 24/7 support via text message',
      contact: 'Text HOME to 741741',
      type: 'text',
      category: 'Crisis Support',
      icon: MessageCircle,
      available: '24/7'
    },
    {
      id: '3',
      name: 'National Child Abuse Hotline',
      description: 'Support for children and adults who were abused as children',
      contact: '1-800-4-A-CHILD (1-800-422-4453)',
      type: 'phone',
      category: 'Abuse Support',
      icon: Shield,
      available: '24/7'
    },
    {
      id: '4',
      name: 'Teen Line',
      description: 'Teens helping teens through difficult times',
      contact: '1-800-852-8336',
      type: 'phone',
      category: 'Teen Support',
      icon: Users,
      available: '6PM-10PM PST'
    },
    {
      id: '5',
      name: 'National Domestic Violence Hotline',
      description: 'Support for domestic violence survivors',
      contact: '1-800-799-7233',
      type: 'phone',
      category: 'Abuse Support',
      icon: Heart,
      available: '24/7'
    },
    {
      id: '6',
      name: 'Mental Health America',
      description: 'Mental health information and resources',
      contact: 'https://mhanational.org',
      type: 'website',
      category: 'Information',
      icon: Globe,
      available: 'Always'
    },
    {
      id: '7',
      name: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service',
      contact: '1-800-662-4357',
      type: 'phone',
      category: 'Treatment',
      icon: Phone,
      available: '24/7'
    },
    {
      id: '8',
      name: 'The Trevor Project',
      description: 'Crisis support for LGBTQ+ youth',
      contact: '1-866-488-7386',
      type: 'phone',
      category: 'LGBTQ+ Support',
      icon: Heart,
      available: '24/7'
    }
  ];

  const categories = [...new Set(resources.map(r => r.category))];

  const handleContact = (resource: Resource) => {
    if (resource.type === 'phone') {
      window.location.href = `tel:${resource.contact.replace(/[^\d]/g, '')}`;
    } else if (resource.type === 'website') {
      window.open(resource.contact, '_blank');
    } else if (resource.type === 'text') {
      // For text resources, we'll just show the instruction
      navigator.clipboard.writeText(resource.contact);
      alert('Instructions copied to clipboard!');
    }
  };

  const getContactButtonText = (resource: Resource) => {
    switch (resource.type) {
      case 'phone':
        return 'Call Now';
      case 'website':
        return 'Visit Site';
      case 'text':
        return 'Copy Instructions';
      default:
        return 'Contact';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Mental Health Resources</h2>
        <p className="text-gray-600">
          You're not alone. Here are trusted resources for support and help.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
          <p className="text-red-800 font-semibold text-sm">
            🚨 If you're in immediate danger, call 911 or go to your nearest emergency room.
          </p>
        </div>
      </div>

      {/* Resources by Category */}
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
            {category}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {resources
              .filter(resource => resource.category === category)
              .map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <IconComponent size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm font-semibold text-gray-800">
                            {resource.name}
                          </CardTitle>
                          <CardDescription className="text-xs text-gray-600 mt-1">
                            Available: {resource.available}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-700 mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-mono text-gray-600 flex-1">
                          {resource.contact}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleContact(resource)}
                          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                        >
                          {getContactButtonText(resource)}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      {/* Footer Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <p className="text-green-800 text-sm">
          💚 Remember: Seeking help is a sign of strength, not weakness. 
          You deserve support and care.
        </p>
      </div>
    </div>
  );
};

export default Resources;
