![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfOR6XKe_mKrYtbHVO-IN_bDrQ53zdMKU9RcbmHcGT9LKvbBl5Uxy86K7t7bRdSREgnDYyOp-QzEzw-vuS2yrZsMV99704VMOTNvwImRZmFcD0VJJK0R4iWK4MyG8CsuIIYrxunsR8Msh27_ZqBYMRo3KmL?key=QpN4_ByJXKnkNKBVxXO9gA)

\
\

**Giovanni Belfiore**

\
\

**SF Retail Media Library**

\
\
\
\

**User Guide**

\
\
\
\
\
\



Last Updated: 23/10/2024

Version : 1

Owner: Belfiore Giovanni

\
\

[1. What is the purpose 2](#1-what-is-the-purpose)

[2. Example of adv 2](#2-example-of-adv)

[3. Considerations on technologies 2](#3-considerations-on-technologies)

[5. thoughtful technologies 3](#5-thoughtful-technologies)

[6. Implementation scheme 4](#6-implementation-scheme)

[7. Installation 5](#7-installation)

[8. AdvManager 5](#8-advmanager)

[8.1 AdvManagerProps 6](#81-advmanagerprops)

[8.2 Params defineSlot 7](#82-params-defineslot)

[9. Component Adv (React) 8](#9-component-adv-react)

[10. Example of use 9](#10-example-of-use)



\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\

#

# 1. What is the purpose

We want to create a library to be distributed via the NPM registry that manages the rendering of ADV retailers on the various shopfully applications. This library will take care of logic like:

- check user privacy consent

- render of adv in various sizes

- any ad refresh logics

# 2. Example of adv

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXewukp9RoZwZBUkCULapsTauVfZVKSe41OAqIpF80FLZMSigoSaXrLGVYkv1ODmK3A9ermLlFBr_-ng_fHWY0RUt7sJtwcfOvJPI-Mga7Qnk6ZJvZOWm0eFL8OVd1LsxMpcPPeB4HT-xrQyv67DZhyU8Uo?key=QpN4_ByJXKnkNKBVxXO9gA)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeZk18STv8WD69-W-G6hJfAYk2fuDUnUan3hevn56l8uMvfG5FnSv32C8wPlOyLj32GIDPaJj3oO9OxvsubHoLB7O4DvgTtKyHC4Wlu8axxqIK1wyhgx31QeDLHGZk9C4MxsUKgOU5EBBsBwZxd6QRKB6Q?key=QpN4_ByJXKnkNKBVxXO9gA)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe4snBaEZygZkbZzj5ygIKwvghs1s4uS-oZFSOjSgBtolMFaJtGojyzyOIxtl8aJfCKydsWk-0VYvNeMr9nUTeVvirpQ1YpikM0el3IlvlMlYmjg1JQvnnZlyMoZR4TwL0l-yymVn4U29XIJoRkgxW8SMiS?key=QpN4_ByJXKnkNKBVxXO9gA)

# 3. Considerations on technologies

- Considering the widespread use of React.js among the marketplaces, the predominant technology for the development of this library will be React.

- Considering that this library will have to be inserted in other contexts that work with style sheets, it will be very important to consider the modules for the style sheets so that there is no overwriting of the classes present in the application project.

- Since the rendering of the ads is subject to the user's consent given and since this could come from various sources (oneTrust, Iubenda,...) the library will not take care of reading the cookies set by the consent managers but only of reading a state ( ACCEPTED / NOT ACCEPTED) provided by the marketplace of use

# 5. thoughtful technologies

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcBoamEpfkzBjqjNaXptJ21z9OajN_kE3EDIdaO6A07Xw8ncRWMloVWqgIJA8VcKh9rBwI4d2Djc4Y3w2Itigws2TfnfSXiZtuiQFuRwtwBdRAabjdMuKG3CUUAkEVeJBVM2mira_xEoTUOQSCBx0izwLA?key=QpN4_ByJXKnkNKBVxXO9gA)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcBocGnlsi87N__0U8VUz14QC-LYxWxu3CZ81qx52QOj4hPcCzeKESf9IAYEoLRRJ-pmNia3rtoXBnW6LsbUBuD-papgeyWQpQwW0QG4HH8zRiEgnvaTL8Bzrs20eePPvA-ZghgTvmDOhnSOCNkDjPNssk-?key=QpN4_ByJXKnkNKBVxXO9gA)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfz7tOJLKg9a6WKPqHBwU_Jmx_6-b5Ex36ko4bBSegplkWHGpz8-T4wjueMVuHfhnig9gmsjx6m2vDfOTc3ThPdB6lTqd-shbF0Jwqp9J1qGQX7gudBTaGwkL4WeRFwrXcLwcOeRF8WcqCVJzbf-lljsN4?key=QpN4_ByJXKnkNKBVxXO9gA)

- **Vitejs**: is a frontend build tool that helps you build web applications faster and more efficiently than traditional build tools like Webpack.

Vitejs' strengths are:

- Speed ​​of development

- Optimized builds

- Native support for ES Modules

- Simple setup

- Compatibility with modern frameworks

- TypeScript and JSX support

* **React**: we will take care of rendering the components and their state manager using React.js. At the moment it seems the most sensible choice given its widespread use in the company

* **TypeScript**: introduces static typing, which means you can declare the type of variables, functions, and objects. This helps prevent type-related runtime errors, such as when trying to access a property of an object that doesn't exist.

# 6. Implementation scheme

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXewqrTEBlYjR6RolgixeTRbh-UVv9iYH8d9e5n4hk3s7c-8xKi2VjzMJhWQlCv33fy81D5yZ8iTf08llO1IfSf6G48EzDE-zjHDZVLijwERHJVTTjlGWc9AfBhx6R32d9he2gFmhnFnby22fLiL-hLwg1KQ?key=QpN4_ByJXKnkNKBVxXO9gA)

the library will essentially be composed of 2 components (without considering type or style files):

1. **AdvManager**: will take care of inserting the necessary script into the head of the application for adv requests to Google Tag Manager. furthermore, this component will contain the logic regarding the given consent released by the user

2. **Adv**: it will be the component that takes care of the actual rendering of the container component in google tag manager and will ignite the frame with the adv. this component will also take care of the dimensions to be given to the slot and any styles passed from the outside

\
\
\
\

# 7. Installation 

    npm i sf-retail-media-library

# 8. AdvManager

AdvManager takes care of inserting the gpt.js script into the head and defining the slot rendering rules

\

|             |                                                                                                                                                                                                                                                                          |                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Method      | Params                                                                                                                                                                                                                                                                   | Note                                                                    |
| init        | props?: AdvManagerProps*(paragraph 8.1)*                                                                                                                                                                                                                                 | initialize the gpt.js script and set params for slot                    |
| update      | props: AdvManagerProps*(paragraph 8.1)*                                                                                                                                                                                                                                  | update params for slot. if the script has not been committed, call init |
| getSlot     | advUnitPath: string                                                                                                                                                                                                                                                      | returns the slot object identified by the path passed as a parameter    |
| destroySlot | advUnitPath: string                                                                                                                                                                                                                                                      | destroys the slot object identified by the path passed as a parameter   |
| refreshSlot | advUnitPath: string                                                                                                                                                                                                                                                      | refresh the slot object identified by the path passed as a parameter    |
| defineSlot  | advUnitPath: string,    advId: string,    sizeMap: \[number, number],    {      defaultTargetingParams,      additionalTargetingParams,    }: { defaultTargetingParams?: IDefaultTargetingParams; additionalTargetingParams?: Record\<string, string> }_(paragraph 8.2)_ | defines the slot object identified by the parameters                    |

## 8.1 AdvManagerProps

\

    {
    advConf:{
    sizeMap: [728,90],
    divId: ‘’div-gpt-ad-1713536623572,
    path: ‘/234290497/next-retail-media-multisize’,
    refreshTime: 100,
    },
    privacySettings: {...},
    enableLazyLoadConfig:{
    fetchMarginPercent: 123,
    mobileScaling: 456, 
    renderMarginPercent: 789
    },
    enableSingleRequest: true
    }

|                      |                                                                                                                                                                                                                                                                                                                                                                                                            |          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| advConf              | configuration for the slots                                                                                                                                                                                                                                                                                                                                                                                | optional |
| —- sizeMap           | array of 2 numbers identifying the width and height of the slots                                                                                                                                                                                                                                                                                                                                           | optional |
| —- divId             | slot divId base. A specialization can be added to this base as an Adv component                                                                                                                                                                                                                                                                                                                            | required |
| —- path              | slot path base. A specialization can be added to this base as an Adv component                                                                                                                                                                                                                                                                                                                             | required |
| —- refreshTime       | number of seconds for the periodic refresh interval                                                                                                                                                                                                                                                                                                                                                        | optional |
| privacySettings      | Allows you to configure all privacy settings from a single API using a configuration object.See the documentation at the following link for optionshttps\://developers.google.com/publisher-tag/reference?hl=it#googletag.PubAdsService_setPrivacySettings                                                                                                                                                 | optional |
| enableLazyLoadConfig | Enable lazy loading in GPT as defined by the config object. For more detailed examples, see the lazy loading example.<https://developers.google.com/publisher-tag/samples/lazy-loading?hl=it>for parameter see this\:// Fetch slots within 5 viewports.etchMarginPercent: 500,  // Render slots within 2 viewports.  renderMarginPercent: 200,  // Double the above values on mobile.  mobileScaling: 2.0, | optional |
| enableSingleRequest  | Allows you to activate single request mode to retrieve multiple ads at once. This requires all publisher ad slots to be defined and added to PubAdsService before enabling the service. You must set the single request mode before activating the service.                                                                                                                                                | optional |

\

## 8.2 Params defineSlot

|                           |                                                                      |          |
| ------------------------- | -------------------------------------------------------------------- | :------: |
| advUnitPath               | path of slot                                                         | required |
| advId                     | divId of slot                                                        | required |
| sizeMap                   | array of 2 numbers identifying the width and height of the slots     | required |
| targeting                 |                                                                      |          |
| —- defaultTargetingParams |   default targeting list. Each value is optional\* flyerId?: string; |

- retailerId?: string;

- storeId?: string;

- platform?: string;

- placement?: string;

- trafficSourceType?: string;

- environment?: string;

- host?: string; | |
  | —- additionalTargetingParams | additional targeting in the format Record\<string,string> | |

# 9. Component Adv (React)

the Adv component takes care of rendering and defining the slot for the adv

              <Adv
                   advConf={{
                     //divId: `div-gpt-ad-1713536623572`,
                     //path: `/234290497/next-retail-media-multisize`,
        		    specializationDivId: `section-1`,
                     specializationPath: `section/1`,
                     sizeMap: [728, 90],
                     refreshTime: 20,
                   }}
                   defaultTargetingParams={{
                     flyerId: '1174245',
                     retailerId: '656',
                   }}
                 />

Below is information on the component props:

- advConf: slot information

  - divId: overrides the value set in AdvManager.

  - path: overrides the value set in AdvManager.

  - specializationDivId: specializes the value set in AdvManager/Adv. the format for any specializations must be

\<param1>-\<param2>-....-\<paramN>.

For example

section-1

- specializationPath: specializes the value set in AdvManager. the format for any specializations must be

\<param1>/\<param2>/..../\<paramN>

For example

section/1

- sizeMap: overrides the value set in AdvManager.

- refreshTime: overrides the value set in AdvManager.

* defaultTargetingParams: default targeting list. Each value is optional

  - flyerId?: string;

  - retailerId?: string;

  - storeId?: string;

  - platform?: string;

  - placement?: string;

  - trafficSourceType?: string;

  - environment?: string;

  - host?: string;

* additionalTargetingParams: additional targeting in the format Record\<string,string>

# 10. Example of use 

    import { Adv, AdvManager, IDefaultTargetingParams } from 'sf-retail-media-library'

<!---->

    function App() {
     AdvManager.init({
       advConf: { 
    divId: 'div-gpt-ad-1713536623572', 
    path: '/234290497/next-retail-media-multisize', 
    sizeMap: [728, 90], 
    refreshTime: 20
    },
     });
     
    return (
       <div>
         {Array.from({ length: 100 }, (_, i) => i).map((iii, i) => {
           return (
             <>
               <p>Lorem ipsum dolor sit amet.</p>
              
               <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                 <Adv
                   key={i}
                   advConf={{
                     //divId: `div-gpt-ad-1713536623572`,
                     //path: `/234290497/next-retail-media-multisize`,
             	   specializationDivId: `section-${i + 1}`,
                     specializationPath: `section-${i + 1}`,
                     sizeMap: i % 2 == 0 ? [300, 250] : [728, 90],
                     refreshTime: 20,
                   }}
                   defaultTargetingParams={{
                     flyerId: '1174245',
                     retailerId: '656',
                   }}
                 />
               </div>
             </>
           );
         })}
       </div>
     );
    }
