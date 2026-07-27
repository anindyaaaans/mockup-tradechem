import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  UserCog,
} from "lucide-react";
import type { OnboardingStage, Seller } from "../../data/agentDashboardData";
import { tierBadge, kycBadge, docStatusBadge, scoreBandBadge } from "./badges";

const STAGES: OnboardingStage[] = [
  "Registration",
  "Documents",
  "KYC",
  "Storefront",
  "Activation",
  "Tier Commitment",
];

const SLA_IDLE_DAYS = 14;

function daysSince(dateStr: string) {
  if (dateStr === "—") return null;
  const d = new Date(dateStr).getTime();
  if (Number.isNaN(d)) return null;
  return Math.max(0, Math.round((Date.now() - d) / 86400000));
}

interface SellerDetailDrawerProps {
  seller: Seller | null;
  onClose: () => void;
}

export function SellerDetailDrawer({ seller, onClose }: SellerDetailDrawerProps) {
  return (
    <Sheet open={!!seller} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        {seller && (
          <>
            <SheetHeader className="border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2 text-xs text-[#2E5529] font-medium mb-1">
                <UserCog className="w-3.5 h-3.5" />
                Viewing As: Agent for Supplier {seller.name}
              </div>
              <SheetTitle>{seller.name}</SheetTitle>
              <SheetDescription>
                {seller.id} · {seller.region} · {seller.productCategory}
              </SheetDescription>
              <div className="flex items-center gap-2 pt-1">{tierBadge(seller.verificationTier)}{kycBadge(seller.kycStatus)}</div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <Tabs defaultValue="onboarding" className="w-full">
                <TabsList className="w-full flex-wrap h-auto gap-1 bg-gray-100 p-1">
                  <TabsTrigger value="onboarding" className="text-xs">Onboarding</TabsTrigger>
                  <TabsTrigger value="activation" className="text-xs">Activation</TabsTrigger>
                  <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
                  <TabsTrigger value="storefront" className="text-xs">Storefront</TabsTrigger>
                  <TabsTrigger value="quality" className="text-xs">Quality</TabsTrigger>
                  <TabsTrigger value="tier" className="text-xs">Tier</TabsTrigger>
                </TabsList>

                {/* Onboarding Status Tracker */}
                <TabsContent value="onboarding" className="pt-4 space-y-3">
                  <p className="text-xs text-gray-500 mb-2">Onboarding Status Tracker</p>
                  {STAGES.map((stage, i) => {
                    const done = seller.onboardingStagesDone.includes(stage);
                    const current = seller.onboardingStage === stage;
                    return (
                      <div key={stage} className="flex items-center gap-3">
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : current ? (
                          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${done ? "text-gray-700" : current ? "text-amber-700 font-medium" : "text-gray-400"}`}>
                          {i + 1}. {stage}
                        </span>
                        {current && <span className="ml-auto text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">IN PROGRESS</span>}
                      </div>
                    );
                  })}
                </TabsContent>

                {/* Activation Tracker */}
                <TabsContent value="activation" className="pt-4 space-y-3">
                  <p className="text-xs text-gray-500 mb-2">Activation Tracker</p>
                  {seller.idle && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">
                        Flagged idle — inactivity exceeds the {SLA_IDLE_DAYS}-day SLA threshold.
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: "Last Login", value: seller.lastLogin },
                      { label: "Last Catalogue Update", value: seller.lastCatalogueUpdate },
                      { label: "Last RFQ Response", value: seller.lastRfqResponse },
                    ].map((row) => {
                      const days = daysSince(row.value);
                      return (
                        <div key={row.label} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                          <span className="text-xs text-gray-500">{row.label}</span>
                          <span className="text-xs font-medium text-gray-800">
                            {row.value}
                            {days !== null && (
                              <span className={`ml-2 ${days > SLA_IDLE_DAYS ? "text-red-500" : "text-gray-400"}`}>
                                ({days}d ago)
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Document Checklist */}
                <TabsContent value="documents" className="pt-4 space-y-2">
                  <p className="text-xs text-gray-500 mb-2">Document Checklist</p>
                  {seller.documents.map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm text-gray-800">{doc.name}</p>
                        {doc.expiry && <p className="text-[11px] text-gray-400">Expiry: {doc.expiry}</p>}
                      </div>
                      {docStatusBadge(doc.status)}
                    </div>
                  ))}
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-1">KYC Status</p>
                    {kycBadge(seller.kycStatus)}
                  </div>
                </TabsContent>

                {/* Storefront Readiness Score */}
                <TabsContent value="storefront" className="pt-4 space-y-4">
                  <p className="text-xs text-gray-500 mb-2">Storefront Readiness Score</p>
                  {[
                    { label: "Profile Completion", value: seller.storefront.profileCompletion },
                    { label: "Technical-Data Completeness", value: seller.storefront.technicalDataCompleteness },
                    { label: "Image Completeness", value: seller.storefront.imageCompleteness },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{row.label}</span>
                        <span className="font-semibold text-gray-800">{row.value}%</span>
                      </div>
                      <Progress value={row.value} className="h-1.5" />
                    </div>
                  ))}
                  <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-500">Product Count</span>
                    <span className="text-xs font-medium text-gray-800">{seller.storefront.productCount} SKUs</span>
                  </div>
                  {seller.storefront.missing.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Missing requirements</p>
                      <ul className="space-y-1">
                        {seller.storefront.missing.map((m) => (
                          <li key={m} className="text-xs text-red-600 flex items-start gap-1.5">
                            <span className="mt-1 w-1 h-1 rounded-full bg-red-500 flex-shrink-0" /> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                {/* Seller Quality Score */}
                <TabsContent value="quality" className="pt-4 space-y-3">
                  <p className="text-xs text-gray-500 mb-2">Seller Quality Score</p>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-gray-900">{seller.qualityScore.overall}</div>
                    <div>
                      {scoreBandBadge(seller.qualityScore.band)}
                      <p className="text-[11px] text-gray-400 mt-1">
                        Trend: {seller.qualityScore.trend === "up" ? "↑ improving" : seller.qualityScore.trend === "down" ? "↓ declining" : "→ flat"} · scored {seller.qualityScore.lastScoredOn}
                      </p>
                    </div>
                  </div>
                  {seller.qualityScore.riskFlags.length > 0 ? (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Active risk flags</p>
                      <ul className="space-y-1">
                        {seller.qualityScore.riskFlags.map((f) => (
                          <li key={f} className="text-xs text-red-600 flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-xs text-green-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> No active risk flags
                    </p>
                  )}
                </TabsContent>

                {/* Tier Readiness */}
                <TabsContent value="tier" className="pt-4 space-y-3">
                  <p className="text-xs text-gray-500 mb-2">Tier Readiness</p>
                  <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-3">
                    <div>
                      <p className="text-[11px] text-gray-400">Current Tier</p>
                      {tierBadge(seller.tierReadiness.currentTier)}
                    </div>
                    <span className="text-gray-300">→</span>
                    <div>
                      <p className="text-[11px] text-gray-400">Eligible Next Tier</p>
                      {seller.tierReadiness.eligibleNextTier ? tierBadge(seller.tierReadiness.eligibleNextTier) : <span className="text-xs text-gray-400">Not yet eligible</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-500">Commitment Status</span>
                    <span className="text-xs font-medium text-gray-800">{seller.tierReadiness.commitmentStatus}</span>
                  </div>
                  {seller.tierReadiness.missingRequirements.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Missing requirements</p>
                      <ul className="space-y-1">
                        {seller.tierReadiness.missingRequirements.map((m) => (
                          <li key={m} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="mt-1 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" /> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
