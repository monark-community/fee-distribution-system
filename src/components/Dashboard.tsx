
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus, Eye, Copy, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardProps {
  splits: any[];
  onCreateNew: () => void;
}

export const Dashboard = ({ splits, onCreateNew }: DashboardProps) => {
  const [selectedSplit, setSelectedSplit] = useState(splits[0]);

  // Mock transaction data
  const mockTransactions = [
    { id: '1', amount: 1.5, timestamp: '2024-01-15T10:30:00Z', hash: '0xabc123...' },
    { id: '2', amount: 0.8, timestamp: '2024-01-14T15:20:00Z', hash: '0xdef456...' },
    { id: '3', amount: 2.3, timestamp: '2024-01-13T09:15:00Z', hash: '0xghi789...' },
  ];

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
            <Button 
              onClick={onCreateNew}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Split
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Manage your revenue splits and monitor distributions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Total Splits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{splits.length}</div>
              <p className="text-gray-400 text-sm">Active contracts</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Total Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">4.6 ETH</div>
              <p className="text-gray-400 text-sm">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Total Distributed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">4.6 ETH</div>
              <p className="text-gray-400 text-sm">Automatically split</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Splits List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Your Splits</h2>
            {splits.map((split) => (
              <Card 
                key={split.id}
                className={`bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer transition-all hover:bg-white/10 ${
                  selectedSplit?.id === split.id ? 'ring-2 ring-purple-400' : ''
                }`}
                onClick={() => setSelectedSplit(split)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">{split.name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {split.recipients.length} recipients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-green-600">Active</Badge>
                    <span className="text-white font-mono text-sm">0x1234...5678</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Split Details */}
          <div className="lg:col-span-2">
            {selectedSplit && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-2xl">{selectedSplit.name}</CardTitle>
                      <CardDescription className="text-gray-300">
                        Contract: 0x1234567890abcdef1234567890abcdef12345678
                        <Button variant="ghost" size="sm" className="ml-2 text-gray-400 hover:text-white">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Etherscan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recipients" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/10">
                      <TabsTrigger value="recipients" className="data-[state=active]:bg-purple-600">
                        Recipients
                      </TabsTrigger>
                      <TabsTrigger value="transactions" className="data-[state=active]:bg-purple-600">
                        Transactions
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="recipients" className="space-y-4">
                      {selectedSplit.recipients.map((recipient, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{recipient.name}</div>
                            <div className="text-gray-400 text-sm font-mono">{recipient.address}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold">{recipient.percentage}%</div>
                            <div className="text-gray-400 text-sm">1.2 ETH received</div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="transactions" className="space-y-4">
                      {mockTransactions.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{tx.amount} ETH</div>
                            <div className="text-gray-400 text-sm">
                              {new Date(tx.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-400 text-sm font-mono">{tx.hash}</div>
                            <Badge className="bg-green-600 mt-1">Distributed</Badge>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
