import Adv from '../lib/components/adv/Adv';
import AdvManager from '../lib/utils/adv-manager/AdvManager';

function App() {
  AdvManager.init({
    advConf: { divId: 'div-gpt-ad-1713536623572', path: '/234290497/next-retail-media-multisize', sizeMap: [400, 90], refreshTime: 20 },
  });
  return (
    <div>
      {Array.from({ length: 100 }, (_, i) => i).map((iii, i) => {
        return (
          <>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.</p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et
              quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
            </p>
            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
              quo voluptas nulla pariatur?
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
              omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.</p>
            <p>
              Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
              consequat vitae, eleifend ac, enim.
            </p>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam dictum felis eu pede mollis
              pretium.
            </p>
            <p>
              Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget
              eros faucibus tincidunt. Duis leo.
            </p>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <Adv
                key={i}
                appendDivId={['div', `${i + 1}`]}
                appendPath={['div', `${i + 1}`]}
                advConf={
                  i == 2
                    ? {
                        divId: 'div-gpt-ad-1713536623572',
                        path: '/234290497/next-retail-media-multisize',
                        sizeMap: [728, 90],
                        refreshTime: 20,
                      }
                    : undefined
                }
                defaultTargetingParams={{
                  flyerId: '1174245',
                  retailerId: '656',
                  // host: 'https://next.doveconviene.it/unieuro'
                }}
              />
            </div>
          </>
        );
      })}
    </div>
  );
}

export default App;
