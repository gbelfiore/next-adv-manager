import Adv from '../lib/components/adv/Adv';
import AdvManager from '../lib/utils/adv-manager/AdvManager';

function App() {
  AdvManager.init({
    advConf: { divId: 'div-gpt-ad-1713536623572', path: '/234290497/next-retail-media-multisize', sizeMap: [728, 90], refreshTime: 20 },
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
                  divId: i % 2 == 0 ? `div-gpt-ad-1713536623572-XXXXXX-${i + 1}` : undefined,
                  path: i % 2 == 0 ? `/234290497/next-retail-media-multisize/YYYYYY/${i + 1}` : undefined,
                  specializationDivId: `div-${i + 1}`,
                  specializationPath: `div-${i + 1}`,
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

export default App;
