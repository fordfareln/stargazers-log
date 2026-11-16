const statusMessage = document.querySelector("#status");
const repositoryList = document.querySelector("#repository-list");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.repository;
      description.textContent = repository.description;
      date.dateTime = repository.starred_at;
      date.textContent = `Starred ${new Date(`${repository.starred_at}T00:00:00Z`).toLocaleDateString(undefined, {
        dateStyle: "long",
        timeZone: "UTC"
      })}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }

    statusMessage.hidden = true;
  } catch (error) {
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
    console.error(error);
  }
}

loadRepositories();
