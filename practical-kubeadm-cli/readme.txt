
Command line commands meant for the control plane node.
No need to ssh to worker nodes just provide the ip and the commands will bran over ssh

practical-kubeadm install
practical-kubeadm uninstall

practical-kubeadm create-control-plane-node
practical-kubeadm revert-control-plane-node
practical-kubeadm create-worker-node <worker-node-ip-address>
practical-kubeadm revert-worker-node <worker-node-ip-address>

