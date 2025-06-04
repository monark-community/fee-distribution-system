
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, TrendingUp, Users, Shield, Zap } from "lucide-react";
import { ConnectWallet } from "@/components/ConnectWallet";
import { CreateSplit } from "@/components/CreateSplit";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showCreateSplit, setShowCreateSplit] = useState(false);
  const [splits, setSplits] = useState([]);

  if (showCreateSplit) {
    return (
      <CreateSplit 
        onBack={() => setShowCreateSplit(false)}
        onCreateSplit={(split) => {
          setSplits([...splits, split]);
          setShowCreateSplit(false);
        }}
      />
    );
  }

  if (isConnected && splits.length > 0) {
    return <Dashboard splits={splits} onCreateNew={() => setShowCreateSplit(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SplitFlow</span>
            </div>
            <ConnectWallet isConnected={isConnected} onConnect={() => setIsConnected(true)} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Automate Revenue
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Splitting</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Smart contract-based system that automatically distributes revenue between multiple stakeholders. 
            Transparent, verifiable, and instant payments without intermediaries.
          </p>
          
          {isConnected ? (
            <div className="space-y-4">
              <Button 
                onClick={() => setShowCreateSplit(true)}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Split
              </Button>
              <p className="text-gray-400">Get started by creating your first revenue split</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400">Connect your wallet to get started</p>
              <ConnectWallet isConnected={isConnected} onConnect={() => setIsConnected(true)} />
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose SplitFlow?</h2>
          <p className="text-gray-300 text-lg">Built for transparency, security, and ease of use</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <Shield className="w-10 h-10 text-purple-400 mb-4" />
              <CardTitle className="text-white">Trustless & Secure</CardTitle>
              <CardDescription className="text-gray-300">
                Smart contracts ensure automatic execution without intermediaries
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <Zap className="w-10 h-10 text-blue-400 mb-4" />
              <CardTitle className="text-white">Instant Distribution</CardTitle>
              <CardDescription className="text-gray-300">
                Funds are split and transferred in real-time as they arrive
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <Users className="w-10 h-10 text-indigo-400 mb-4" />
              <CardTitle className="text-white">Multi-Stakeholder</CardTitle>
              <CardDescription className="text-gray-300">
                Support unlimited recipients with customizable percentages
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Perfect For</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "DAOs", desc: "Treasury distribution & contributor rewards" },
            { title: "Developers", desc: "Protocol fees & revenue sharing" },
            { title: "Creators", desc: "Royalty splits with collaborators" },
            { title: "Businesses", desc: "Partner profit sharing agreements" }
          ].map((useCase, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-lg">{useCase.title}</CardTitle>
                <CardDescription className="text-gray-300">{useCase.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 SplitFlow. Built for the decentralized economy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
