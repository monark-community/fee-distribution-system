
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Recipient {
  id: string;
  name: string;
  address: string;
  percentage: number;
}

interface CreateSplitProps {
  onBack: () => void;
  onCreateSplit: (split: any) => void;
}

export const CreateSplit = ({ onBack, onCreateSplit }: CreateSplitProps) => {
  const [splitName, setSplitName] = useState('');
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: '1', name: '', address: '', percentage: 0 }
  ]);

  const addRecipient = () => {
    const newRecipient: Recipient = {
      id: Date.now().toString(),
      name: '',
      address: '',
      percentage: 0
    };
    setRecipients([...recipients, newRecipient]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter(r => r.id !== id));
    }
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string | number) => {
    setRecipients(recipients.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const totalPercentage = recipients.reduce((sum, r) => sum + r.percentage, 0);

  const handleCreateSplit = () => {
    if (splitName && totalPercentage === 100) {
      const split = {
        id: Date.now().toString(),
        name: splitName,
        recipients: recipients.filter(r => r.name && r.address),
        totalReceived: 0,
        totalDistributed: 0,
        createdAt: new Date().toISOString()
      };
      onCreateSplit(split);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">SplitFlow</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Create Revenue Split</h1>
          <p className="text-gray-300">Set up automatic revenue distribution to multiple recipients</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Split Configuration</CardTitle>
              <CardDescription className="text-gray-300">
                Configure your revenue split settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="splitName" className="text-white">Split Name</Label>
                <Input
                  id="splitName"
                  placeholder="e.g., Dev Team Revenue Split"
                  value={splitName}
                  onChange={(e) => setSplitName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-white">Recipients</Label>
                  <Button 
                    onClick={addRecipient}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="space-y-4">
                  {recipients.map((recipient, index) => (
                    <div key={recipient.id} className="p-4 bg-white/5 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Recipient {index + 1}</span>
                        {recipients.length > 1 && (
                          <Button
                            onClick={() => removeRecipient(recipient.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-gray-300 text-sm">Name</Label>
                          <Input
                            placeholder="Recipient name"
                            value={recipient.name}
                            onChange={(e) => updateRecipient(recipient.id, 'name', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 text-sm">Percentage</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            max="100"
                            value={recipient.percentage || ''}
                            onChange={(e) => updateRecipient(recipient.id, 'percentage', parseFloat(e.target.value) || 0)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-gray-300 text-sm">Wallet Address</Label>
                        <Input
                          placeholder="0x..."
                          value={recipient.address}
                          onChange={(e) => updateRecipient(recipient.id, 'address', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-white">Total Percentage:</span>
                  <Badge 
                    variant={totalPercentage === 100 ? "default" : "destructive"}
                    className={totalPercentage === 100 ? "bg-green-600" : "bg-red-600"}
                  >
                    {totalPercentage}%
                  </Badge>
                </div>
              </div>

              <Button 
                onClick={handleCreateSplit}
                disabled={!splitName || totalPercentage !== 100}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Create Split Contract
              </Button>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Split Preview</CardTitle>
              <CardDescription className="text-gray-300">
                Preview how funds will be distributed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recipients.filter(r => r.name && r.percentage > 0).map((recipient) => (
                  <div key={recipient.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{recipient.name || 'Unnamed'}</div>
                      <div className="text-gray-400 text-sm">{recipient.address || 'No address'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{recipient.percentage}%</div>
                    </div>
                  </div>
                ))}
                
                {recipients.filter(r => r.name && r.percentage > 0).length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    Add recipients to see preview
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
