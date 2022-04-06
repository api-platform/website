import { useLayoutEffect, useContext, useState } from 'react';
import { ConfContext } from '@con/components/layout';

const useEventBriteModal: (id: string) => void = (id) => {
  const { isEventBriteLoaded } = useContext(ConfContext);
  const [isWidgetCreated, setIsWidgetCreated] = useState(false);

  useLayoutEffect(() => {
    if (isEventBriteLoaded && !isWidgetCreated) {
      // @ts-expect-error eventbrite widget
      window.EBWidgets?.createWidget({
        widgetType: 'checkout',
        eventId: '304104152707',
        modal: true,
        modalTriggerElementId: id,
      });
      setIsWidgetCreated(true);
    }
  }, [isEventBriteLoaded, id, isWidgetCreated, setIsWidgetCreated]);
};

export default useEventBriteModal;
