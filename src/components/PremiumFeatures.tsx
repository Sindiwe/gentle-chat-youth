
import { Lock, Crown, Star, TrendingUp, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: any;
  tier: 'premium' | 'pro';
  price: number;
}

const PremiumFeatures = () => {
  const premiumFeatures: PremiumFeature[] = [
    {
      id: '1',
      name: 'Advanced Journal Analytics',
      description: 'Mood patterns, emotional insights, and progress tracking',
      icon: TrendingUp,
      tier: 'premium',
      price: 4.99
    },
    {
      id: '2',
      name: 'Custom Journal Templates',
      description: 'Specialized templates for anxiety, depression, and trauma',
      icon: Star,
      tier: 'premium',
      price: 4.99
    },
    {
      id: '3',
      name: 'Export & Backup',
      description: 'Download your journal entries and mood data',
      icon: Download,
      tier: 'premium',
      price: 4.99
    },
    {
      id: '4',
      name: 'Extended History',
      description: 'Access unlimited journal entries and mood history',
      icon: Calendar,
      tier: 'pro',
      price: 9.99
    }
  ];

  const currentTier = 'free'; // Simulated - would come from user context

  const handleUpgrade = (tier: string) => {
    // Simulated upgrade process
    console.log(`Upgrading to ${tier} tier`);
    alert(`Upgrade to ${tier} initiated! (Simulated for hackathon)`);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return Crown;
      case 'pro': return Star;
      default: return Lock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Premium Features</h2>
        <p className="text-gray-600">
          Unlock advanced journaling capabilities and insights
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-yellow-800 font-semibold text-sm">
            🚀 Currently on Free Plan - Unlock premium features for deeper insights!
          </p>
        </div>
      </div>

      {/* Current Plan Status */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock size={20} className="text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-green-800">Free Plan</CardTitle>
                <CardDescription className="text-green-600">
                  Basic journaling and mood tracking
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Current</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-green-700">
            <p>✅ Unlimited journal entries</p>
            <p>✅ Basic mood tracking</p>
            <p>✅ Anonymous chat support</p>
            <p>✅ Mental health resources</p>
          </div>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
          Available Upgrades
        </h3>
        <div className="grid gap-4">
          {premiumFeatures.map((feature) => {
            const IconComponent = feature.icon;
            const TierIcon = getTierIcon(feature.tier);
            
            return (
              <Card key={feature.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <IconComponent size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-semibold text-gray-800">
                            {feature.name}
                          </CardTitle>
                          <TierIcon size={14} className="text-blue-600" />
                        </div>
                        <CardDescription className="text-xs text-gray-600 mt-1">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getTierColor(feature.tier)}>
                      {feature.tier}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-blue-600">
                      ${feature.price}/month
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleUpgrade(feature.tier)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
          Subscription Plans
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <Lock className="h-8 w-8 mx-auto text-gray-500" />
              <CardTitle>Free</CardTitle>
              <div className="text-2xl font-bold">$0/month</div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>✅ Basic journaling</li>
                <li>✅ Mood tracking</li>
                <li>✅ AI chat support</li>
                <li>✅ Mental health resources</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-blue-500 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white">Most Popular</Badge>
            </div>
            <CardHeader className="text-center">
              <Crown className="h-8 w-8 mx-auto text-blue-500" />
              <CardTitle>Premium</CardTitle>
              <div className="text-2xl font-bold">$4.99/month</div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>✅ Everything in Free</li>
                <li>✅ Advanced analytics</li>
                <li>✅ Custom templates</li>
                <li>✅ Export & backup</li>
              </ul>
              <Button 
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
                onClick={() => handleUpgrade('premium')}
              >
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Star className="h-8 w-8 mx-auto text-purple-500" />
              <CardTitle>Pro</CardTitle>
              <div className="text-2xl font-bold">$9.99/month</div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>✅ Everything in Premium</li>
                <li>✅ Unlimited history</li>
                <li>✅ Priority support</li>
                <li>✅ Advanced insights</li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => handleUpgrade('pro')}
              >
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Impact */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">Revenue Impact (Simulated)</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-green-700">Premium subscribers: 800</p>
            <p className="text-green-700">Monthly revenue: $3,200</p>
          </div>
          <div>
            <p className="text-green-700">Pro subscribers: 150</p>
            <p className="text-green-700">Monthly revenue: $1,500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures;
