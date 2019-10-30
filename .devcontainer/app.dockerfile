FROM node:lts
ENV DEBIAN_FRONTEND=noninteractive

# The node image comes with a base non-root 'node' user which this Dockerfile
# gives sudo access. However, for Linux, this user's GID/UID must match your local
# user UID/GID to avoid permission issues with bind mounts. Update USER_UID / USER_GID 
# if yours is not 1000. See https://aka.ms/vscode-remote/containers/non-root-user.
ARG USER_UID=1000
ARG USER_GID=${USER_UID}
COPY package.json /workspace/
COPY yarn.lock /workspace/
RUN apt-get update \
  && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
  # Verify git and needed tools are installed
  && apt-get -y install git iproute2 procps \
  # Remove outdated yarn from /opt and install via package 
  && rm -rf /opt/yarn-* \
  && rm -f /usr/local/bin/yarn \
  && rm -f /usr/local/bin/yarnpkg \
  && apt-get install -y curl apt-transport-https lsb-release zsh \
  && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
  && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get -y install --no-install-recommends yarn \
  # install eslint typescript globally
  && yarn global add eslint typescript commitizen cz-conventional-changelog \
  && echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc \
  && cd /workspace && yarn \
  && wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true \
  # Update a non-root user to match UID/GID - see https://aka.ms/vscode-remote/containers/non-root-user.
  && if [ "$USER_GID" != "1000" ]; then groupmod node --gid $USER_GID; fi \
  && if [ "$USER_UID" != "1000" ]; then usermod --uid $USER_UID node; fi \
  # Add add sudo support for non-root user
  && apt-get install -y sudo \
  && echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
  && chmod 0440 /etc/sudoers.d/node \
  # Clean up
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*