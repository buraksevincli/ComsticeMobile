#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <RNCallKeep/RNCallKeep.h>
#import "RNBootSplash.h"
#import "RNFBMessagingModule.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"ComsticeMobile";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];
  
  [RNCallKeep setup:@{
     @"appName": @"ComsticeMobile",
     @"maximumCallGroups": @3,
     @"maximumCallsPerCallGroup": @1,
     @"supportsVideo": @NO,
   }];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
//  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)customizeRootView:(RCTRootView *)rootView {
  [super customizeRootView:rootView];
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];
}

@end
