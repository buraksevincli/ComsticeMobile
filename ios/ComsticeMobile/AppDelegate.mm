#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <RNCallKeep/RNCallKeep.h>
#import "RNBootSplash.h"
#import "RNFBMessagingModule.h"
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  // Notification center delegate setup
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self; // Set delegate to handle notifications in foreground
  
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

#pragma mark - UNUserNotificationCenterDelegate

// Handle foreground notifications
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  NSDictionary *userInfo = notification.request.content.userInfo;
  NSLog(@"Foreground notification received: %@", userInfo);

  // Show Notification (alert, banner, sound)
  completionHandler(UNNotificationPresentationOptionList | UNNotificationPresentationOptionBanner | UNNotificationPresentationOptionSound);
}

// Handle tapped notifications
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
   didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  NSLog(@"Tapped notification received: %@", userInfo);
  
  completionHandler();
}

// Handle background notifications (no tap required)
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
      fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  NSLog(@"Background notification received: %@", userInfo);

  if (application.applicationState == UIApplicationStateActive) {
      NSLog(@"Notification received while app is in foreground.");
  } else if (application.applicationState == UIApplicationStateBackground) {
      NSLog(@"Notification received in background.");
          NSUUID *uuid = [NSUUID UUID];
          NSString *callerName = @"Test Caller";
          NSString *handle = @"123456789";

          [RNCallKeep reportNewIncomingCall:uuid.UUIDString
                                      handle:handle
                                  handleType:@"number"
                                    hasVideo:NO
                         localizedCallerName:callerName
                             supportsHolding:YES
                                supportsDTMF:YES
                            supportsGrouping:YES
                          supportsUngrouping:YES
                                 fromPushKit:NO
                                     payload:@{}
                       withCompletionHandler:nil];
  }

  completionHandler(UIBackgroundFetchResultNewData);
}



@end
