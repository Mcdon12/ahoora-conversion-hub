import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ChevronRight, TrendingUp } from "lucide-react";
import { MCCAccount, GoogleAdsAccount } from "@/types/dashboard";

interface AccountSelectorProps {
  mccAccounts: MCCAccount[];
  selectedMCC?: MCCAccount;
  selectedAccount?: GoogleAdsAccount;
  onMCCSelect: (mcc: MCCAccount) => void;
  onAccountSelect: (account: GoogleAdsAccount) => void;
  className?: string;
}

export function AccountSelector({
  mccAccounts,
  selectedMCC,
  selectedAccount,
  onMCCSelect,
  onAccountSelect,
  className
}: AccountSelectorProps) {
  const [availableAccounts, setAvailableAccounts] = useState<GoogleAdsAccount[]>([]);

  useEffect(() => {
    if (selectedMCC) {
      setAvailableAccounts(selectedMCC.childAccounts);
    } else {
      setAvailableAccounts([]);
    }
  }, [selectedMCC]);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5 text-primary" />
          Account Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* MCC Account Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Manager Account (MCC)
          </label>
          <Select
            value={selectedMCC?.id || ""}
            onValueChange={(value) => {
              const mcc = mccAccounts.find(acc => acc.id === value);
              if (mcc) onMCCSelect(mcc);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select manager account..." />
            </SelectTrigger>
            <SelectContent>
              {mccAccounts.map((mcc) => (
                <SelectItem key={mcc.id} value={mcc.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {mcc.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Child Account Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Client Account
          </label>
          <Select
            value={selectedAccount?.id || ""}
            onValueChange={(value) => {
              const account = availableAccounts.find(acc => acc.id === value);
              if (account) onAccountSelect(account);
            }}
            disabled={!selectedMCC}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={selectedMCC ? "Select client account..." : "Select MCC first"} />
            </SelectTrigger>
            <SelectContent>
              {availableAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{account.name}</span>
                    {account.spend && (
                      <Badge variant="outline" className="ml-2">
                        {account.spend}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Account Summary */}
        {selectedAccount && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Active Account</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex items-center gap-2">
              <div className="font-semibold text-primary">{selectedAccount.name}</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {selectedAccount.spend && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {selectedAccount.spend}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ready to chat about {selectedAccount.name} campaigns
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}