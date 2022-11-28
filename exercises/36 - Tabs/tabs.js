const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

function handleTabClick(event) {
  // hide the other tab panels
  tabPanels.forEach((tabPannel) => {
    tabPannel.hidden = true;
  });
  // mark all tabs as unselected
  tabButtons.forEach((tab) => {
    tab.setAttribute('aria-selected', false);
  });
  // mark the clicked tab as selected
  event.currentTarget.setAttribute('aria-selected', true);

  // find the associated tabPannel and show it !
  const { id } = event.currentTarget;

  /* First way of doing it - querySelector
  const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  tabPanel.hidden = false;
  */

  /// Second way - Find() method (only works on arrays)
  const tabPanel = Array.from(tabPanels).find(
    (panel) => panel.getAttribute('aria-labelledby') === id
  );
  tabPanel.hidden = false;
}

tabButtons.forEach((button) =>
  button.addEventListener('click', handleTabClick)
);
