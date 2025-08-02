This repository is primarily for creating a command line interface to handle kubernetes cluster setup with kubeadm.
Currently setting up a kubernetes control plane is very piecemeal and manual. 
This project aims to automate the process in an expressive and insightful way.


Todos:
1. Setup control plane
2. Setup remote command execution and init command
3. Add the controlplane node command sequence to the init command
4. remotely setup control-plane node.
  -- -dont forget to update kubelet command line arguments and kublet config file


Repeat above steps with a worker node.
