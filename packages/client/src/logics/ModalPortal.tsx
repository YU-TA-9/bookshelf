import * as ReactDOM from 'react-dom';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

const modalRootId = 'modal-root';

export const ModalPortal = ({ children }: Props) => {
  const el = React.useMemo(() => {
    const el = document.createElement('div');
    el.id = modalRootId;
    return el;
  }, []);

  React.useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
};
