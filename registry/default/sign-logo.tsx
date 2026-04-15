import clsx from 'clsx';
import { motion, useAnimate } from 'motion/react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

function withResolvers<T>() {
  let resolve: (value?: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = (value) => res(value ?? (null as T));
    reject = rej;
  });

  return {
    resolve: resolve!,
    reject: reject!,
    promise
  };
}

interface SignLogoProps {
  className?: string;
  onReady?: () => void;
  onComplete?: () => void;
}

export const SignLogo: React.FC<{ className?: string }> = (props) => {
  const { className } = props;

  return (
    <img
      className={clsx('object-contain object-center', className)}
      src="https://public-cdn.sign.global/Attestation-Frontend/global/logo-sign_241223035655.svg"
      alt=""
    />
  );
};

export const AnimatedSignLogo: React.FC<SignLogoProps> = forwardRef((props, ref) => {
  const { className, onReady, onComplete } = props;

  const [scope, animate] = useAnimate();

  const loadingPromiseRef = useRef(withResolvers());

  const startAnimation = async () => {
    await loadingPromiseRef.current.promise;

    animate([
      ['[data-static-image]', { opacity: 1 }, { at: 0, duration: 0.1 }],
      ['[data-gif-image]', { opacity: 0 }, { at: 0.2, duration: 0.2 }],
      ['[data-blur-image]', { opacity: 1 }, { at: 0.4, duration: 0.2 }],
      ['[data-blur-image]', { opacity: 1 }, { duration: 0.5 }]
    ]).then(() => {
      onComplete?.();
    });
  };

  useImperativeHandle(ref, () => {
    return {
      startAnimation
    };
  });

  useEffect(() => {
    const init = () => {
      const imgs = Array.from((scope.current as HTMLDivElement).querySelectorAll('img'));

      const loadingImageTask = imgs.map((img) => {
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
        });
      });

      Promise.all(loadingImageTask).then(() => {
        onReady?.();
        loadingPromiseRef.current.resolve();
      });
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={scope}
      className={clsx('relative flex select-none items-center justify-center overflow-hidden p-6', className)}
    >
      <motion.img
        data-blur-image
        initial={{ opacity: 0 }}
        className="absolute size-full h-[120px] w-[245px] object-contain object-center blur-[10px]"
        src="https://public-cdn.sign.global/Attestation-Frontend/global/logo-sign_241223035655.svg"
        alt=""
      />

      <motion.img
        data-static-image
        initial={{ opacity: 0 }}
        className="h-[120px] w-[245px] object-contain object-center opacity-0"
        src="https://public-cdn.sign.global/Attestation-Frontend/global/logo-sign_241223035655.svg"
        alt=""
      />

      <motion.img
        data-gif-image
        initial={{ opacity: 1 }}
        className="absolute w-[426px] max-w-none select-none object-contain object-center"
        src="https://public-cdn.sign.global/Attestation-Frontend/global/sign-logo_241226092610.gif"
        alt=""
        onLoad={() => {
          setTimeout(() => {
            startAnimation();
          }, 1600);
        }}
      />
    </motion.div>
  );
});
