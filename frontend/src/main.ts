import App from "./app"
import { Events, EventHub } from "./lib/eventhub/index";

const app = new App();
const hub = EventHub.getInstance();

// if use nagivates to other pages using the browersers back/forward buttons
// or the url bar, this will trigger the nagivation event to render that page
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const path = url.pathname + url.search;
    const rootContainer = document.getElementById("root");

    if (rootContainer) rootContainer.appendChild(app.render());

    hub.publish(Events.NavigateTo, path);
});

window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    const path = url.pathname + url.search;
    hub.publish(Events.NavigateTo, path);
})