import json
import logging
from typing import List, Optional

from datetime import datetime, date

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from services.newsletter_subscribers import Newsletter_subscribersService

# Set up logging
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/entities/newsletter_subscribers", tags=["newsletter_subscribers"])


# ---------- Pydantic Schemas ----------
class Newsletter_subscribersData(BaseModel):
    """Entity data schema (for create/update)"""
    email: str


class Newsletter_subscribersUpdateData(BaseModel):
    """Update entity data (partial updates allowed)"""
    email: Optional[str] = None


class Newsletter_subscribersResponse(BaseModel):
    """Entity response schema"""
    id: int
    email: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Newsletter_subscribersListResponse(BaseModel):
    """List response schema"""
    items: List[Newsletter_subscribersResponse]
    total: int
    skip: int
    limit: int


class Newsletter_subscribersBatchCreateRequest(BaseModel):
    """Batch create request"""
    items: List[Newsletter_subscribersData]


class Newsletter_subscribersBatchUpdateItem(BaseModel):
    """Batch update item"""
    id: int
    updates: Newsletter_subscribersUpdateData


class Newsletter_subscribersBatchUpdateRequest(BaseModel):
    """Batch update request"""
    items: List[Newsletter_subscribersBatchUpdateItem]


class Newsletter_subscribersBatchDeleteRequest(BaseModel):
    """Batch delete request"""
    ids: List[int]


# ---------- Routes ----------
@router.get("", response_model=Newsletter_subscribersListResponse)
async def query_newsletter_subscriberss(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    """Query newsletter_subscriberss with filtering, sorting, and pagination"""
    logger.debug(f"Querying newsletter_subscriberss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")
    
    service = Newsletter_subscribersService(db)
    try:
        # Parse query JSON if provided
        query_dict = None
        if query:
            try:
                query_dict = json.loads(query)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Invalid query JSON format")
        
        result = await service.get_list(
            skip=skip, 
            limit=limit,
            query_dict=query_dict,
            sort=sort,
        )
        logger.debug(f"Found {result['total']} newsletter_subscriberss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying newsletter_subscriberss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/all", response_model=Newsletter_subscribersListResponse)
async def query_newsletter_subscriberss_all(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    # Query newsletter_subscriberss with filtering, sorting, and pagination without user limitation
    logger.debug(f"Querying newsletter_subscriberss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")

    service = Newsletter_subscribersService(db)
    try:
        # Parse query JSON if provided
        query_dict = None
        if query:
            try:
                query_dict = json.loads(query)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Invalid query JSON format")

        result = await service.get_list(
            skip=skip,
            limit=limit,
            query_dict=query_dict,
            sort=sort
        )
        logger.debug(f"Found {result['total']} newsletter_subscriberss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying newsletter_subscriberss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/{id}", response_model=Newsletter_subscribersResponse)
async def get_newsletter_subscribers(
    id: int,
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    """Get a single newsletter_subscribers by ID"""
    logger.debug(f"Fetching newsletter_subscribers with id: {id}, fields={fields}")
    
    service = Newsletter_subscribersService(db)
    try:
        result = await service.get_by_id(id)
        if not result:
            logger.warning(f"Newsletter_subscribers with id {id} not found")
            raise HTTPException(status_code=404, detail="Newsletter_subscribers not found")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching newsletter_subscribers {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("", response_model=Newsletter_subscribersResponse, status_code=201)
async def create_newsletter_subscribers(
    data: Newsletter_subscribersData,
    db: AsyncSession = Depends(get_db),
):
    """Create a new newsletter_subscribers"""
    logger.debug(f"Creating new newsletter_subscribers with data: {data}")
    
    service = Newsletter_subscribersService(db)
    try:
        result = await service.create(data.model_dump())
        if not result:
            raise HTTPException(status_code=400, detail="Failed to create newsletter_subscribers")
        
        logger.info(f"Newsletter_subscribers created successfully with id: {result.id}")
        return result
    except ValueError as e:
        logger.error(f"Validation error creating newsletter_subscribers: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating newsletter_subscribers: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/batch", response_model=List[Newsletter_subscribersResponse], status_code=201)
async def create_newsletter_subscriberss_batch(
    request: Newsletter_subscribersBatchCreateRequest,
    db: AsyncSession = Depends(get_db),
):
    """Create multiple newsletter_subscriberss in a single request"""
    logger.debug(f"Batch creating {len(request.items)} newsletter_subscriberss")
    
    service = Newsletter_subscribersService(db)
    results = []
    
    try:
        for item_data in request.items:
            result = await service.create(item_data.model_dump())
            if result:
                results.append(result)
        
        logger.info(f"Batch created {len(results)} newsletter_subscriberss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch create: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch create failed: {str(e)}")


@router.put("/batch", response_model=List[Newsletter_subscribersResponse])
async def update_newsletter_subscriberss_batch(
    request: Newsletter_subscribersBatchUpdateRequest,
    db: AsyncSession = Depends(get_db),
):
    """Update multiple newsletter_subscriberss in a single request"""
    logger.debug(f"Batch updating {len(request.items)} newsletter_subscriberss")
    
    service = Newsletter_subscribersService(db)
    results = []
    
    try:
        for item in request.items:
            # Only include non-None values for partial updates
            update_dict = {k: v for k, v in item.updates.model_dump().items() if v is not None}
            result = await service.update(item.id, update_dict)
            if result:
                results.append(result)
        
        logger.info(f"Batch updated {len(results)} newsletter_subscriberss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch update: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch update failed: {str(e)}")


@router.put("/{id}", response_model=Newsletter_subscribersResponse)
async def update_newsletter_subscribers(
    id: int,
    data: Newsletter_subscribersUpdateData,
    db: AsyncSession = Depends(get_db),
):
    """Update an existing newsletter_subscribers"""
    logger.debug(f"Updating newsletter_subscribers {id} with data: {data}")

    service = Newsletter_subscribersService(db)
    try:
        # Only include non-None values for partial updates
        update_dict = {k: v for k, v in data.model_dump().items() if v is not None}
        result = await service.update(id, update_dict)
        if not result:
            logger.warning(f"Newsletter_subscribers with id {id} not found for update")
            raise HTTPException(status_code=404, detail="Newsletter_subscribers not found")
        
        logger.info(f"Newsletter_subscribers {id} updated successfully")
        return result
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error updating newsletter_subscribers {id}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error updating newsletter_subscribers {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.delete("/batch")
async def delete_newsletter_subscriberss_batch(
    request: Newsletter_subscribersBatchDeleteRequest,
    db: AsyncSession = Depends(get_db),
):
    """Delete multiple newsletter_subscriberss by their IDs"""
    logger.debug(f"Batch deleting {len(request.ids)} newsletter_subscriberss")
    
    service = Newsletter_subscribersService(db)
    deleted_count = 0
    
    try:
        for item_id in request.ids:
            success = await service.delete(item_id)
            if success:
                deleted_count += 1
        
        logger.info(f"Batch deleted {deleted_count} newsletter_subscriberss successfully")
        return {"message": f"Successfully deleted {deleted_count} newsletter_subscriberss", "deleted_count": deleted_count}
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch delete: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch delete failed: {str(e)}")


@router.delete("/{id}")
async def delete_newsletter_subscribers(
    id: int,
    db: AsyncSession = Depends(get_db),
):
    """Delete a single newsletter_subscribers by ID"""
    logger.debug(f"Deleting newsletter_subscribers with id: {id}")
    
    service = Newsletter_subscribersService(db)
    try:
        success = await service.delete(id)
        if not success:
            logger.warning(f"Newsletter_subscribers with id {id} not found for deletion")
            raise HTTPException(status_code=404, detail="Newsletter_subscribers not found")
        
        logger.info(f"Newsletter_subscribers {id} deleted successfully")
        return {"message": "Newsletter_subscribers deleted successfully", "id": id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting newsletter_subscribers {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")