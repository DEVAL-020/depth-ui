import React, { lazy, Suspense } from "react";

// Loading Skeleton with matching dimensions to prevent any layout shift (CLS: 0)
const ComponentSkeleton: React.FC = () => (
  <div className="w-full min-h-[280px] flex flex-col items-center justify-center gap-2.5 py-12 text-zinc-500">
    <div className="w-5 h-5 rounded-full border-2 border-zinc-800 border-t-zinc-400 animate-spin" />
    <span className="text-xs font-mono text-zinc-500">
      Loading interactive stage...
    </span>
  </div>
);

// 1. Heavy Three.js & WebGL 3D Spatial Visuals (Lazily loaded so Three.js never blocks initial FCP/TBT)
const Globe3D = lazy(() => import("../library/Globe3D"));
const HoloOrbCanvas = lazy(() => import("../library/HoloOrbCanvas"));
const WaveMeshCanvas3D = lazy(() => import("../library/WaveMeshCanvas3D"));
const FloatingTorusKnot3D = lazy(() => import("../library/FloatingTorusKnot3D"));
const FloatingParticles = lazy(() => import("../library/FloatingParticles"));

// 2. Interactive Spatial & CSS 3D Transforms
const DepthCard3D = lazy(() => import("../library/DepthCard3D"));
const Interactive3DCubeDemo = lazy(() => import("../library/Interactive3DCube"));
const BentoGrid3D = lazy(() => import("../library/BentoGrid3D"));
const SpatialMotionCardDemo = lazy(() => import("../library/SpatialMotionCard"));

// 3. High-Demand Interactive Motion & Utilities
const MagneticButton = lazy(() => import("../library/MagneticButton"));
const SpotlightCard = lazy(() => import("../library/SpotlightCard"));
const InteractiveDock = lazy(() => import("../library/InteractiveDock"));
const HyperText = lazy(() => import("../library/HyperText"));
const NeonTabs = lazy(() => import("../library/NeonTabs"));
const MorphingDialog = lazy(() => import("../library/MorphingDialog"));
const InfiniteMarquee = lazy(() => import("../library/InfiniteMarquee"));
const TopLoadingBarDemo = lazy(() => import("../library/TopLoadingBar"));
const FluidMagneticCursorDemo = lazy(
  () => import("../library/FluidMagneticCursor"),
);
const CommandPaletteDemo = lazy(() => import("../library/CommandPaletteDemo"));
const NumberTickerDemo = lazy(() => import("../library/NumberTicker"));
const SlidingPillTabsDemo = lazy(() => import("../library/SlidingPillTabs"));
const FloatingSpeedDialDemo = lazy(() => import("../library/FloatingSpeedDial"));

// 4. Core Frontend UI Primitives
const ButtonSuiteDemo = lazy(() => import("../library/ButtonSuite"));
const InputGroupDemo = lazy(() => import("../library/InputGroup"));
const SelectDropdownDemo = lazy(() => import("../library/SelectDropdown"));
const SwitchToggleDemo = lazy(() => import("../library/SwitchToggle"));
const CheckboxRadioDemo = lazy(() => import("../library/CheckboxRadio"));
const BadgeStatusDemo = lazy(() => import("../library/BadgeStatus"));
const AccordionDemo = lazy(() => import("../library/Accordion"));
const TabsNavDemo = lazy(() => import("../library/TabsNav"));
const NavbarSuiteDemo = lazy(() => import("../library/NavbarSuite"));
const DialogModalDemo = lazy(() => import("../library/DialogModal"));
const AlertToastDemo = lazy(() => import("../library/AlertToast"));
const DataTableDemo = lazy(() => import("../library/DataTable"));
const AvatarGroupDemo = lazy(() => import("../library/AvatarGroup"));
const TooltipPopoverDemo = lazy(() => import("../library/TooltipPopover"));
const ProgressSkeletonDemo = lazy(() => import("../library/ProgressSkeleton"));
const BreadcrumbPaginationDemo = lazy(
  () => import("../library/BreadcrumbPagination"),
);
const MetricCardDemo = lazy(() => import("../library/MetricCard"));
const OtpPinInputDemo = lazy(() => import("../library/OtpPinInput"));
const FileDropzoneDemo = lazy(() => import("../library/FileDropzone"));
const TimelineRoadmapDemo = lazy(() => import("../library/TimelineRoadmap"));
const KbdShortcutSuiteDemo = lazy(() => import("../library/KbdShortcutSuite"));
const GradientTextShimmerDemo = lazy(
  () => import("../library/GradientTextShimmer"),
);
const FeatureComparisonTableDemo = lazy(
  () => import("../library/FeatureComparisonTable"),
);
const SocialButtonsSuiteDemo = lazy(
  () => import("../library/SocialButtonsSuite"),
);

// 5. Vibrant & Colorful Primitives
const GradientGlowCard = lazy(() => import("../library/GradientGlowCard"));
const PricingTierCard = lazy(() => import("../library/PricingTierCard"));
const ColorfulAnalytics = lazy(() => import("../library/ColorfulAnalytics"));
const RadiantButtonDemo = lazy(() => import("../library/RadiantButton"));
const ColorPalettePicker = lazy(() => import("../library/ColorPalettePicker"));
const OptimizedImageCard = lazy(() => import("../library/OptimizedImageCard"));
const ImageComparisonSlider = lazy(
  () => import("../library/ImageComparisonSlider"),
);

// 6. Vibrant Suite (9 items)
const GlassmorphicCardDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.GlassmorphicCardDemo,
  })),
);
const GradientBadgeGroupDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.GradientBadgeGroupDemo,
  })),
);
const AuroraBackgroundDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.AuroraBackgroundDemo,
  })),
);
const GlowActionCardDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.GlowActionCardDemo,
  })),
);
const SpotlightPricingDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.SpotlightPricingDemo,
  })),
);
const GradientAvatarRingDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.GradientAvatarRingDemo,
  })),
);
const GradientStatCardDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.GradientStatCardDemo,
  })),
);
const VibrantBannerDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.VibrantBannerDemo,
  })),
);
const ColorSwatchSelectorDemo = lazy(() =>
  import("../library/vibrantSuite").then((m) => ({
    default: m.ColorSwatchSelectorDemo,
  })),
);

// 7. Forms Suite (9 items)
const PasswordStrengthInputDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.PasswordStrengthInputDemo,
  })),
);
const TagMultiInputDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.TagMultiInputDemo,
  })),
);
const CurrencyNumberInputDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.CurrencyNumberInputDemo,
  })),
);
const PhoneCountryInputDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.PhoneCountryInputDemo,
  })),
);
const TextareaCharCountDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.TextareaCharCountDemo,
  })),
);
const RatingFeedbackPickerDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.RatingFeedbackPickerDemo,
  })),
);
const DateRangePickerDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.DateRangePickerDemo,
  })),
);
const SegmentedButtonGroupDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.SegmentedButtonGroupDemo,
  })),
);
const SearchAutocompleteInputDemo = lazy(() =>
  import("../library/formsSuite").then((m) => ({
    default: m.SearchAutocompleteInputDemo,
  })),
);

// 8. Data Suite (9 items)
const CircularProgressRingDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.CircularProgressRingDemo,
  })),
);
const EmptyStateCardDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.EmptyStateCardDemo,
  })),
);
const KeyValueListDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.KeyValueListDemo,
  })),
);
const StepProgressTrackerDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.StepProgressTrackerDemo,
  })),
);
const MiniSparklineChartDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.MiniSparklineChartDemo,
  })),
);
const AlertBannerStackDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.AlertBannerStackDemo,
  })),
);
const StatusBadgeMatrixDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.StatusBadgeMatrixDemo,
  })),
);
const FileTreeViewDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.FileTreeViewDemo,
  })),
);
const UserFeedbackModalDemo = lazy(() =>
  import("../library/dataSuite").then((m) => ({
    default: m.UserFeedbackModalDemo,
  })),
);

// 9. Navigation Suite (9 items)
const SidebarCollapsibleNavDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.SidebarCollapsibleNavDemo,
  })),
);
const ContextMenuDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.ContextMenuDemo,
  })),
);
const MobileDrawerSheetDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.MobileDrawerSheetDemo,
  })),
);
const StepperWizardNavDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.StepperWizardNavDemo,
  })),
);
const FloatingAnnouncementPillDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.FloatingAnnouncementPillDemo,
  })),
);
const MegaMenuDropdownDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.MegaMenuDropdownDemo,
  })),
);
const UserProfileDropdownDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.UserProfileDropdownDemo,
  })),
);
const DockedActionBarDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.DockedActionBarDemo,
  })),
);
const SplitButtonDropdownDemo = lazy(() =>
  import("../library/navigationSuite").then((m) => ({
    default: m.SplitButtonDropdownDemo,
  })),
);

// 10. Spatial Suite (9 items)
const TiltParallaxCardDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.TiltParallaxCardDemo,
  })),
);
const DotMatrixCanvasDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.DotMatrixCanvasDemo,
  })),
);
const ParticleNetworkCanvasDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.ParticleNetworkCanvasDemo,
  })),
);
const PerspectiveDeviceMockupDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.PerspectiveDeviceMockupDemo,
  })),
);
const RadarPulseScannerDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.RadarPulseScannerDemo,
  })),
);
const AudioVisualizerBarsDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.AudioVisualizerBarsDemo,
  })),
);
const IsometricCubesGridDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.IsometricCubesGridDemo,
  })),
);
const HolographicBadge3DDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.HolographicBadge3DDemo,
  })),
);
const StackedCards3DDemo = lazy(() =>
  import("../library/spatialSuite").then((m) => ({
    default: m.StackedCards3DDemo,
  })),
);

// 11. Motion Suite (9 items)
const SwipeableStackCardsDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.SwipeableStackCardsDemo,
  })),
);
const ExpandableBentoCardDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.ExpandableBentoCardDemo,
  })),
);
const StaggeredRevealListDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.StaggeredRevealListDemo,
  })),
);
const ShimmerSkeletonCardDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.ShimmerSkeletonCardDemo,
  })),
);
const TypewriterHeadlineDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.TypewriterHeadlineDemo,
  })),
);
const ScrollProgressIndicatorDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.ScrollProgressIndicatorDemo,
  })),
);
const SmoothAccordionFaqDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.SmoothAccordionFaqDemo,
  })),
);
const FloatingTestimonialCarouselDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.FloatingTestimonialCarouselDemo,
  })),
);
const ConfettiCelebrationDemo = lazy(() =>
  import("../library/motionSuite").then((m) => ({
    default: m.ConfettiCelebrationDemo,
  })),
);

export const ComponentRenderer: React.FC<{ componentId: string }> = ({
  componentId,
}) => {
  const renderInner = () => {
    switch (componentId) {
      // Vibrant & Colorful Components
      case "gradient-glow-card":
        return <GradientGlowCard />;

      case "pricing-tier-card":
        return <PricingTierCard />;

      case "colorful-analytics":
        return <ColorfulAnalytics />;

      case "radiant-button":
        return <RadiantButtonDemo />;

      case "color-palette-picker":
        return <ColorPalettePicker />;

      case "optimized-image-card":
        return <OptimizedImageCard />;

      case "image-comparison-slider":
        return <ImageComparisonSlider />;

      // Core Daily Frontend Primitives
      case "button-suite":
        return <ButtonSuiteDemo />;

      case "social-buttons":
        return <SocialButtonsSuiteDemo />;

      case "input-group":
        return <InputGroupDemo />;

      case "select-dropdown":
        return <SelectDropdownDemo />;

      case "switch-toggle":
        return <SwitchToggleDemo />;

      case "checkbox-radio":
        return <CheckboxRadioDemo />;

      case "badge-status":
        return <BadgeStatusDemo />;

      case "accordion":
        return <AccordionDemo />;

      case "tabs-nav":
        return <TabsNavDemo />;

      case "navbar-suite":
        return <NavbarSuiteDemo />;

      case "dialog-modal":
        return <DialogModalDemo />;

      case "alert-toast":
        return <AlertToastDemo />;

      case "data-table":
        return <DataTableDemo />;

      case "avatar-group":
        return <AvatarGroupDemo />;

      case "tooltip-popover":
        return <TooltipPopoverDemo />;

      case "progress-skeleton":
        return <ProgressSkeletonDemo />;

      case "breadcrumb-pagination":
        return <BreadcrumbPaginationDemo />;

      case "metric-card":
        return <MetricCardDemo />;

      // Display, Spatial & Motion Primitives
      case "depth-card-3d":
        return (
          <div className="w-full flex justify-center py-4">
            <DepthCard3D
              title="Design System Primitive"
              subtitle="Physics-based 3D perspective with natural inertia and depth layering."
              tag="3D Layer"
            />
          </div>
        );
      case "globe-3d":
        return (
          <div className="w-full flex justify-center py-4">
            <Globe3D size={320} dotColor="#71717a" glowColor="#3f3f46" />
          </div>
        );
      case "holo-orb-canvas":
        return (
          <div className="w-full flex justify-center py-4">
            <HoloOrbCanvas
              size={300}
              accentColor="#e4e4e7"
              coreColor="#71717a"
              speed={1.0}
            />
          </div>
        );
      case "magnetic-button":
        return (
          <div className="w-full flex flex-col items-center justify-center gap-6 py-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton variant="primary">Get Started</MagneticButton>
              <MagneticButton variant="glow">View Components</MagneticButton>
              <MagneticButton variant="glass">Documentation</MagneticButton>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              Cursor proximity triggers magnetic spring force
            </p>
          </div>
        );
      case "spotlight-card":
        return (
          <div className="w-full max-w-md mx-auto py-4">
            <SpotlightCard
              title="Dynamic Spotlight"
              description="Subtle radial lighting effect that tracks cursor position across card boundaries."
              spotlightColor="rgba(255, 255, 255, 0.08)"
              badge="Lighting"
            />
          </div>
        );
      case "interactive-dock":
        return (
          <div className="w-full flex justify-center py-6">
            <InteractiveDock />
          </div>
        );
      case "hyper-text":
        return (
          <div className="w-full flex flex-col items-center justify-center gap-4 py-8">
            <div className="p-5 rounded-xl bg-[#121215] border border-zinc-800 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-bold text-zinc-200">
                <HyperText text="SYSTEM_VERIFICATION_OK" duration={800} />
              </div>
              <p className="text-xs text-zinc-500 mt-2 font-mono">
                Hover to trigger matrix decode animation
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">
                <HyperText text="BUILD: 24.4.0" />
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">
                <HyperText text="STATUS: STABLE" />
              </span>
            </div>
          </div>
        );
      case "bento-grid-3d":
        return (
          <div className="w-full py-4">
            <BentoGrid3D />
          </div>
        );
      case "neon-tabs":
        return (
          <div className="w-full flex flex-col items-center justify-center gap-4 py-6">
            <NeonTabs accentColor="cyan" />
          </div>
        );
      case "floating-particles":
        return (
          <div className="relative w-full h-72 rounded-xl overflow-hidden bg-[#0d0d0f] border border-zinc-800/80 flex items-center justify-center">
            <FloatingParticles
              particleCount={300}
              color="#71717a"
              accentColor="#a1a1aa"
            />
            <div className="relative z-10 text-center p-3 rounded-lg bg-black/60 border border-zinc-800 backdrop-blur-xs">
              <p className="text-xs font-semibold text-zinc-300">
                Ambient Background Canvas
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Move mouse to tilt depth perspective
              </p>
            </div>
          </div>
        );
      case "morphing-dialog":
        return (
          <div className="w-full flex justify-center py-6">
            <MorphingDialog />
          </div>
        );
      case "infinite-marquee":
        return (
          <div className="w-full py-6">
            <InfiniteMarquee speed={22} tilt={false} />
          </div>
        );
      case "top-loading-bar":
        return <TopLoadingBarDemo />;

      case "fluid-magnetic-cursor":
        return <FluidMagneticCursorDemo />;

      case "spatial-motion-card":
        return <SpatialMotionCardDemo />;

      case "command-palette":
        return <CommandPaletteDemo />;

      case "number-ticker":
        return <NumberTickerDemo />;

      case "sliding-pill-tabs":
        return <SlidingPillTabsDemo />;

      case "floating-speed-dial":
        return <FloatingSpeedDialDemo />;

      case "wave-mesh-3d":
        return <WaveMeshCanvas3D />;

      case "interactive-3d-cube":
        return <Interactive3DCubeDemo />;

      case "floating-torus-knot-3d":
        return <FloatingTorusKnot3D />;

      case "otp-pin-input":
        return <OtpPinInputDemo />;

      case "file-dropzone":
        return <FileDropzoneDemo />;

      case "timeline-roadmap":
        return <TimelineRoadmapDemo />;

      case "kbd-shortcuts":
        return <KbdShortcutSuiteDemo />;

      case "text-shimmer":
        return <GradientTextShimmerDemo />;

      case "feature-comparison":
        return <FeatureComparisonTableDemo />;

      // Group 1: Vibrant & Colors (9 items)
      case "glassmorphic-card":
        return <GlassmorphicCardDemo />;
      case "gradient-badge-group":
        return <GradientBadgeGroupDemo />;
      case "aurora-background":
        return <AuroraBackgroundDemo />;
      case "glow-action-card":
        return <GlowActionCardDemo />;
      case "spotlight-pricing":
        return <SpotlightPricingDemo />;
      case "gradient-avatar-ring":
        return <GradientAvatarRingDemo />;
      case "gradient-stat-card":
        return <GradientStatCardDemo />;
      case "vibrant-banner":
        return <VibrantBannerDemo />;
      case "color-swatch-selector":
        return <ColorSwatchSelectorDemo />;

      // Group 2: Forms & Inputs (9 items)
      case "password-strength-input":
        return <PasswordStrengthInputDemo />;
      case "tag-multi-input":
        return <TagMultiInputDemo />;
      case "currency-number-input":
        return <CurrencyNumberInputDemo />;
      case "phone-country-input":
        return <PhoneCountryInputDemo />;
      case "textarea-char-count":
        return <TextareaCharCountDemo />;
      case "rating-feedback-picker":
        return <RatingFeedbackPickerDemo />;
      case "date-range-picker":
        return <DateRangePickerDemo />;
      case "segmented-button-group":
        return <SegmentedButtonGroupDemo />;
      case "search-autocomplete-input":
        return <SearchAutocompleteInputDemo />;

      // Group 3: Data & Feedback (9 items)
      case "circular-progress-ring":
        return <CircularProgressRingDemo />;
      case "empty-state-card":
        return <EmptyStateCardDemo />;
      case "key-value-list":
        return <KeyValueListDemo />;
      case "step-progress-tracker":
        return <StepProgressTrackerDemo />;
      case "mini-sparkline-chart":
        return <MiniSparklineChartDemo />;
      case "alert-banner-stack":
        return <AlertBannerStackDemo />;
      case "status-badge-matrix":
        return <StatusBadgeMatrixDemo />;
      case "file-tree-view":
        return <FileTreeViewDemo />;
      case "user-feedback-modal":
        return <UserFeedbackModalDemo />;

      // Group 4: Navigation & Overlays (9 items)
      case "sidebar-collapsible-nav":
        return <SidebarCollapsibleNavDemo />;
      case "context-menu":
        return <ContextMenuDemo />;
      case "mobile-drawer-sheet":
        return <MobileDrawerSheetDemo />;
      case "stepper-wizard-nav":
        return <StepperWizardNavDemo />;
      case "floating-announcement-pill":
        return <FloatingAnnouncementPillDemo />;
      case "mega-menu-dropdown":
        return <MegaMenuDropdownDemo />;
      case "user-profile-dropdown":
        return <UserProfileDropdownDemo />;
      case "docked-action-bar":
        return <DockedActionBarDemo />;
      case "split-button-dropdown":
        return <SplitButtonDropdownDemo />;

      // Group 5: Display & 3D (9 items)
      case "tilt-parallax-card":
        return <TiltParallaxCardDemo />;
      case "dot-matrix-canvas":
        return <DotMatrixCanvasDemo />;
      case "particle-network-canvas":
        return <ParticleNetworkCanvasDemo />;
      case "perspective-device-mockup":
        return <PerspectiveDeviceMockupDemo />;
      case "radar-pulse-scanner":
        return <RadarPulseScannerDemo />;
      case "audio-visualizer-bars":
        return <AudioVisualizerBarsDemo />;
      case "isometric-cubes-grid":
        return <IsometricCubesGridDemo />;
      case "holographic-badge-3d":
        return <HolographicBadge3DDemo />;
      case "3d-stacked-cards":
        return <StackedCards3DDemo />;

      // Group 6: Motion & Layout (9 items)
      case "swipeable-stack-cards":
        return <SwipeableStackCardsDemo />;
      case "expandable-bento-card":
        return <ExpandableBentoCardDemo />;
      case "staggered-reveal-list":
        return <StaggeredRevealListDemo />;
      case "shimmer-skeleton-card":
        return <ShimmerSkeletonCardDemo />;
      case "typewriter-headline":
        return <TypewriterHeadlineDemo />;
      case "scroll-progress-indicator":
        return <ScrollProgressIndicatorDemo />;
      case "smooth-accordion-faq":
        return <SmoothAccordionFaqDemo />;
      case "floating-testimonial-carousel":
        return <FloatingTestimonialCarouselDemo />;
      case "confetti-celebration":
        return <ConfettiCelebrationDemo />;

      default:
        return <div>Component preview not found</div>;
    }
  };

  return <Suspense fallback={<ComponentSkeleton />}>{renderInner()}</Suspense>;
};

export default ComponentRenderer;
