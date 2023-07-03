package com.wks.storage.service.minio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.wks.storage.service.BucketService;
import com.wks.storage.service.DownloadService;
import com.wks.storage.service.ServiceFactory;
import com.wks.storage.service.UploadService;

@Service("MinioServiceFactory")
public class MinioServiceFactory implements ServiceFactory {

	@Autowired
	@Qualifier("MinioBucketService")
	private BucketService bucketService;

	@Autowired
	@Qualifier("MinioDownloadService")
	private DownloadService downloadService;

	@Autowired
	@Qualifier("MinioUploadService")
	private UploadService uploadService;

	@Override
	public BucketService getBucketService() {
		return bucketService;
	}

	@Override
	public DownloadService getDownloadService() {
		return downloadService;
	}

	@Override
	public UploadService getUploadService() {
		return uploadService;
	}

}
