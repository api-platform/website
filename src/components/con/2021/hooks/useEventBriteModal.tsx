import { useLayoutEffect, useContext, useState } from 'react';
import { ConfContext } from '../layout';

const useEventBriteModal: (id: string) => void = (id) => {
  const { isEventBriteLoaded } = useContext(ConfContext);
  const [isWidgetCreated, setIsWidgetCreated] = useState(false);

  useLayoutEffect(() => {
    if (isEventBriteLoaded && !isWidgetCreated) {
      // @ts-expect-error eventbrite widget
      window.EBWidgets?.createWidget({
        widgetType: 'checkout',
        eventId: '146559873527',
        modal: true,
        modalTriggerElementId: id,
      });
      setIsWidgetCreated(true);
    }
  }, [isEventBriteLoaded, id, isWidgetCreated, setIsWidgetCreated]);
};

export default useEventBriteModal;
