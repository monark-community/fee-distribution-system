import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
interface ConnectWalletProps {
  isConnected: boolean;
  onConnect: () => void;
}
export const ConnectWallet = ({
  isConnected,
  onConnect
}: ConnectWalletProps) => {
  if (isConnected) {
    return <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-white">0x1234...5678</span>
      </div>;
  }
  return <Button onClick={onConnect} variant="outline" className="border-white/20 bg-[000000] bg-white text-[#224e96]">
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>;
};